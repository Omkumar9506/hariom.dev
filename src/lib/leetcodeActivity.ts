import { LeetCodeActivityData } from "@/types/portfolio";
import fs from "fs";
import path from "path";

export const LEETCODE_FALLBACK_DATA: LeetCodeActivityData = {
  totalSolved: 320,
  easySolved: 138,
  mediumSolved: 154,
  hardSolved: 28,
  contestRating: 1640,
  contestTopPercentage: "Top 18%",
  ranking: "184,210",
  acceptanceRate: "68.4%",
};

let cachedData: { data: LeetCodeActivityData; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour in-memory cache

export async function getLeetCodeActivity(username: string = "omkumar95065"): Promise<LeetCodeActivityData> {
  const now = Date.now();
  if (cachedData && now - cachedData.timestamp < CACHE_TTL_MS) {
    return cachedData.data;
  }

  // Attempt to query LeetCode GraphQL with a tight timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const query = `
      query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        userContestRanking(username: $username) {
          rating
          topPercentage
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      const matchedUser = json?.data?.matchedUser;
      if (matchedUser) {
        const stats = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
        const allItem = stats.find((s: { difficulty: string }) => s.difficulty === "All");
        const easyItem = stats.find((s: { difficulty: string }) => s.difficulty === "Easy");
        const medItem = stats.find((s: { difficulty: string }) => s.difficulty === "Medium");
        const hardItem = stats.find((s: { difficulty: string }) => s.difficulty === "Hard");
        const contest = json?.data?.userContestRanking;

        const liveData: LeetCodeActivityData = {
          totalSolved: allItem?.count ?? LEETCODE_FALLBACK_DATA.totalSolved,
          easySolved: easyItem?.count ?? LEETCODE_FALLBACK_DATA.easySolved,
          mediumSolved: medItem?.count ?? LEETCODE_FALLBACK_DATA.mediumSolved,
          hardSolved: hardItem?.count ?? LEETCODE_FALLBACK_DATA.hardSolved,
          contestRating: contest?.rating ? Math.round(contest.rating) : LEETCODE_FALLBACK_DATA.contestRating,
          contestTopPercentage: contest?.topPercentage
            ? `Top ${Math.round(contest.topPercentage)}%`
            : LEETCODE_FALLBACK_DATA.contestTopPercentage,
          ranking: matchedUser.profile?.ranking
            ? matchedUser.profile.ranking.toLocaleString()
            : LEETCODE_FALLBACK_DATA.ranking,
        };

        cachedData = { data: liveData, timestamp: now };
        return liveData;
      }
    }
  } catch {
    // Graceful fallback to cached data, then disk /data/leetcode-fallback.json
  }

  // Fallback to /data/leetcode-fallback.json
  try {
    const fallbackPath = path.join(process.cwd(), "public", "data", "leetcode-fallback.json");
    if (fs.existsSync(fallbackPath)) {
      const fileContent = fs.readFileSync(fallbackPath, "utf-8");
      const parsed = JSON.parse(fileContent) as LeetCodeActivityData;
      cachedData = { data: parsed, timestamp: now };
      return parsed;
    }
  } catch {
    // If reading file fails, use memory constant
  }

  cachedData = { data: LEETCODE_FALLBACK_DATA, timestamp: now };
  return LEETCODE_FALLBACK_DATA;
}

export async function generateRealisticLeetCodeActivity(): Promise<LeetCodeActivityData> {
  return await getLeetCodeActivity();
}
