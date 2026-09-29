import { ContributionDay, ContributionWeek, MonthBlock, GitHubActivityData } from "@/types/portfolio";

export function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

export function groupDaysIntoLeetCodeMonths(
  rawDays: { date: string; contributionCount: number }[]
): { months: MonthBlock[]; totalContributions: number; totalActiveDays: number; maxStreak: number } {
  // Sort days ascending
  const sorted = [...rawDays].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let totalContributions = 0;
  let totalActiveDays = 0;
  let maxStreak = 0;
  let currentStreak = 0;

  for (const d of sorted) {
    totalContributions += d.contributionCount;
    if (d.contributionCount > 0) {
      totalActiveDays++;
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  // Group by YYYY-MM
  const monthMap = new Map<string, { date: string; contributionCount: number }[]>();
  for (const d of sorted) {
    const key = d.date.substring(0, 7); // e.g. "2025-03"
    if (!monthMap.has(key)) {
      monthMap.set(key, []);
    }
    monthMap.get(key)!.push(d);
  }

  const months: MonthBlock[] = [];

  for (const [key, daysInMonth] of monthMap.entries()) {
    const [yStr, mStr] = key.split("-");
    const year = parseInt(yStr, 10);
    const monthIndex = parseInt(mStr, 10) - 1; // 0-based
    const sampleDate = new Date(year, monthIndex, 1);
    const monthName = sampleDate.toLocaleString("en-US", { month: "short" });

    const weeks: ContributionWeek[] = [];
    let currentWeek: (ContributionDay | null)[] = new Array(7).fill(null);

    for (const d of daysInMonth) {
      const [yearNum, monthNum, dayNum] = d.date.split("-").map(Number);
      const dayDate = new Date(yearNum, monthNum - 1, dayNum);
      const weekday = dayDate.getDay(); // 0 is Sunday, 6 is Saturday

      const contribDay: ContributionDay = {
        date: d.date,
        count: d.contributionCount,
        level: getLevel(d.contributionCount),
        weekday,
      };

      currentWeek[weekday] = contribDay;

      // If Saturday reached, close week and push
      if (weekday === 6) {
        weeks.push({ days: currentWeek });
        currentWeek = new Array(7).fill(null);
      }
    }

    // If there's an unfinished week with days, push it
    if (currentWeek.some((d) => d !== null)) {
      weeks.push({ days: currentWeek });
    }

    months.push({
      name: monthName,
      year,
      monthIndex,
      weeks,
    });
  }

  return {
    months,
    totalContributions,
    totalActiveDays,
    maxStreak,
  };
}

export function generateRealisticActivityFallback(yearParam: string = "current"): GitHubActivityData {
  const isCurrent = yearParam === "current" || yearParam === "Current";
  const now = new Date();
  const currentYear = now.getFullYear();
  const targetYear = isCurrent ? currentYear : parseInt(yearParam, 10) || currentYear;

  const rawDays: { date: string; contributionCount: number }[] = [];

  let startDate: Date;
  let endDate: Date;

  if (isCurrent) {
    // Past one year (365 days ago until today)
    endDate = new Date(now);
    startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 364);
  } else {
    // Specific calendar year Jan 1 to Dec 31
    startDate = new Date(targetYear, 0, 1);
    endDate = targetYear === currentYear ? new Date(now) : new Date(targetYear, 11, 31);
  }

  const cur = new Date(startDate);
  while (cur <= endDate) {
    const dateStr = cur.toISOString().split("T")[0];
    const dVal = cur.getDate();
    const mVal = cur.getMonth();
    const dayOfWeek = cur.getDay();

    // Pseudo-random deterministic seed
    const seed = (cur.getFullYear() * 41 + (mVal + 1) * 23 + dVal * 17) % 100;

    let count = 0;
    // ~70% active days with realistic commit clusters
    if (seed < 70) {
      if (seed < 18) count = 1;
      else if (seed < 38) count = 2;
      else if (seed < 55) count = 4;
      else if (seed < 64) count = 7;
      else count = 11;

      // Slight weekend/weekday variation
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        if (seed % 3 === 0) count += 2;
      }
    }

    rawDays.push({ date: dateStr, contributionCount: count });
    cur.setDate(cur.getDate() + 1);
  }

  const { months, totalContributions, totalActiveDays, maxStreak } = groupDaysIntoLeetCodeMonths(rawDays);

  return {
    year: isCurrent ? "Current" : targetYear.toString(),
    publicRepos: 18,
    totalContributions,
    totalActiveDays,
    maxStreak: Math.max(maxStreak, 28),
    months,
    isLive: false,
  };
}
