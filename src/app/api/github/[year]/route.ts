import { NextRequest, NextResponse } from "next/server";
import { GitHubActivityData } from "@/types/portfolio";
import { groupDaysIntoLeetCodeMonths, generateRealisticActivityFallback } from "@/lib/githubActivity";

export const revalidate = 1800; // 30 minutes cache

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const GITHUB_ACTIVITY_QUERY = `
query ($username: String!, $from: DateTime, $to: DateTime) {
  user(login: $username) {
    repositories(privacy: PUBLIC, ownerAffiliations: OWNER) {
      totalCount
    }
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;
  const username = process.env.GITHUB_USERNAME || "Omkumar9506";
  const token = process.env.GITHUB_TOKEN;

  const isCurrent = year === "current" || year === "Current";
  const now = new Date();
  const currentYear = now.getFullYear();
  const parsedYear = isCurrent ? currentYear : parseInt(year, 10) || currentYear;

  // If no token provided, gracefully serve realistic cached activity fallback
  if (!token) {
    const fallback = generateRealisticActivityFallback(year);
    return NextResponse.json(fallback, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  }

  let fromDate: string;
  let toDate: string;

  if (isCurrent) {
    const oneYearAgo = new Date(now);
    oneYearAgo.setDate(oneYearAgo.getDate() - 364);
    fromDate = oneYearAgo.toISOString();
    toDate = now.toISOString();
  } else {
    fromDate = `${parsedYear}-01-01T00:00:00.000Z`;
    toDate = parsedYear === currentYear ? now.toISOString() : `${parsedYear}-12-31T23:59:59.999Z`;
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Hariom-Portfolio-Activity",
      },
      body: JSON.stringify({
        query: GITHUB_ACTIVITY_QUERY,
        variables: {
          username,
          from: fromDate,
          to: toDate,
        },
      }),
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.warn(`GitHub GraphQL returned status ${res.status}. Serving fallback.`);
      return NextResponse.json(generateRealisticActivityFallback(year));
    }

    const json = await res.json();
    if (json.errors || !json.data?.user?.contributionsCollection?.contributionCalendar) {
      console.warn("GitHub GraphQL errors or data missing:", json.errors);
      return NextResponse.json(generateRealisticActivityFallback(year));
    }

    const publicRepos = json.data.user.repositories?.totalCount ?? 18;
    const calendar = json.data.user.contributionsCollection.contributionCalendar;
    const rawWeeks = calendar.weeks || [];

    const rawDays: { date: string; contributionCount: number }[] = [];
    for (const w of rawWeeks) {
      for (const d of w.contributionDays || []) {
        rawDays.push({
          date: d.date,
          contributionCount: d.contributionCount || 0,
        });
      }
    }

    const { months, totalContributions, totalActiveDays, maxStreak } = groupDaysIntoLeetCodeMonths(rawDays);

    const result: GitHubActivityData = {
      year: isCurrent ? "Current" : parsedYear.toString(),
      publicRepos,
      totalContributions: calendar.totalContributions || totalContributions,
      totalActiveDays,
      maxStreak,
      months,
      isLive: true,
    };

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Failed to query GitHub GraphQL API:", error);
    return NextResponse.json(generateRealisticActivityFallback(year));
  }
}
