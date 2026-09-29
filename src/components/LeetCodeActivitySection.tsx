"use client";

import { useState, useEffect } from "react";
import { Code2, Trophy } from "lucide-react";
import { LeetCodeActivityData } from "@/types/portfolio";
import { LeetCodeIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

function useCountUp(end: number, duration: number = 800): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      return;
    }

    if (end === 0) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return count;
}

export default function LeetCodeActivitySection() {
  const [activityData, setActivityData] = useState<LeetCodeActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback behavior: cached data / API first, then /data/leetcode-fallback.json
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      setLoading(true);

      try {
        const res = await fetch("/api/leetcode");
        if (res.ok) {
          const data: LeetCodeActivityData = await res.json();
          if (!isCancelled && data && data.totalSolved) {
            setActivityData(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("API /api/leetcode failed, falling back to /data/leetcode-fallback.json:", err);
      }

      // Fallback to /data/leetcode-fallback.json
      try {
        const fallbackRes = await fetch("/data/leetcode-fallback.json");
        if (fallbackRes.ok) {
          const fallbackData: LeetCodeActivityData = await fallbackRes.json();
          if (!isCancelled) {
            setActivityData(fallbackData);
          }
        }
      } catch (fallbackErr) {
        console.error("Failed to fetch leetcode-fallback.json:", fallbackErr);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isCancelled = true;
    };
  }, []);

  const totalSolved = activityData?.totalSolved || 320;
  const easySolved = activityData?.easySolved || 138;
  const mediumSolved = activityData?.mediumSolved || 154;
  const hardSolved = activityData?.hardSolved || 28;
  const contestRating = activityData?.contestRating || 1640;

  const animatedTotal = useCountUp(loading ? 0 : totalSolved);
  const animatedEasy = useCountUp(loading ? 0 : easySolved);
  const animatedMedium = useCountUp(loading ? 0 : mediumSolved);
  const animatedHard = useCountUp(loading ? 0 : hardSolved);
  const animatedRating = useCountUp(loading ? 0 : contestRating);

  const easyPercent = totalSolved > 0 ? (easySolved / totalSolved) * 100 : 43;
  const mediumPercent = totalSolved > 0 ? (mediumSolved / totalSolved) * 100 : 48;
  const hardPercent = totalSolved > 0 ? (hardSolved / totalSolved) * 100 : 9;

  return (
    <section
      id="leetcode-activity"
      className="relative py-12 sm:py-14 bg-[#090a0d] border-b border-[#20242e] scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#c8ff00] mb-3">
          <Code2 className="h-3.5 w-3.5" />
          <span>ALGORITHMIC TELEMETRY // LEETCODE ACTIVITY</span>
        </div>

        {/* Section Title & Profile Link */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#f2f4f7]">
            Problem Solving &amp; Submissions
          </h2>
          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open omkumar95065 on LeetCode"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8a919e] hover:text-[#c8ff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00] rounded px-2 py-1 border border-[#232732] bg-[#111317] hover:border-[#c8ff00]/40"
          >
            <LeetCodeIcon className="h-3.5 w-3.5" />
            <span>@omkumar95065</span>
            <span aria-hidden="true" className="text-[10px]">↗</span>
          </a>
        </div>

        {/* LeetCode Activity Card */}
        <div className="relative rounded-xl border border-[#232732] bg-[#111317] p-5 sm:p-6 shadow-xl">
          {/* Card Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f232c] mb-5">
            <div className="flex items-center gap-2.5">
              <LeetCodeIcon className="h-5 w-5 text-[#ffa116]" />
              <span className="text-sm font-semibold text-white tracking-wide">
                DSA Problem Solving Metrics
              </span>
              {activityData?.ranking && (
                <span className="hidden sm:inline-block font-mono text-xs text-[#8a919e] bg-[#181a21] border border-[#282d38] px-2 py-0.5 rounded">
                  Global Rank #{activityData.ranking}
                </span>
              )}
            </div>

            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LeetCode Profile for omkumar95065"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8a919e] hover:text-[#c8ff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00] rounded px-2 py-1 border border-[#282d38] bg-[#181a21] hover:border-[#c8ff00]/40"
            >
              <span>View Profile</span>
              <span aria-hidden="true" className="text-[10px]">↗</span>
            </a>
          </div>

          {/* Stat Row: Total Solved, Easy / Medium / Hard, Contest Rating */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Stat 1: Total Solved */}
            <div className="rounded-lg border border-[#232732] bg-[#161820] p-4 text-left transition-all hover:border-[#333a4a]">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                {loading ? (
                  <span className="animate-pulse text-[#4a5264]">--</span>
                ) : (
                  `${animatedTotal}+`
                )}
              </div>
              <div className="text-xs text-[#8a919e] font-mono mt-1">
                Total Solved
              </div>
            </div>

            {/* Stat 2: Easy Solved */}
            <div className="rounded-lg border border-[#232732] bg-[#161820] p-4 text-left transition-all hover:border-[#333a4a]">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#00b8a3] tracking-tight">
                {loading ? (
                  <span className="animate-pulse text-[#4a5264]">--</span>
                ) : (
                  animatedEasy
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8a919e] font-mono mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b8a3]" />
                <span>Easy</span>
              </div>
            </div>

            {/* Stat 3: Medium Solved */}
            <div className="rounded-lg border border-[#232732] bg-[#161820] p-4 text-left transition-all hover:border-[#333a4a]">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#ffc01e] tracking-tight">
                {loading ? (
                  <span className="animate-pulse text-[#4a5264]">--</span>
                ) : (
                  animatedMedium
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8a919e] font-mono mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ffc01e]" />
                <span>Medium</span>
              </div>
            </div>

            {/* Stat 4: Hard Solved */}
            <div className="rounded-lg border border-[#232732] bg-[#161820] p-4 text-left transition-all hover:border-[#333a4a]">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#ff375f] tracking-tight">
                {loading ? (
                  <span className="animate-pulse text-[#4a5264]">--</span>
                ) : (
                  animatedHard
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8a919e] font-mono mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff375f]" />
                <span>Hard</span>
              </div>
            </div>

            {/* Stat 5: Contest Rating */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-1 rounded-lg border border-[#232732] bg-[#161820] p-4 text-left transition-all hover:border-[#333a4a]">
              <div className="flex items-baseline justify-between gap-1">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#c8ff00] tracking-tight">
                  {loading ? (
                    <span className="animate-pulse text-[#4a5264]">--</span>
                  ) : (
                    animatedRating.toLocaleString()
                  )}
                </div>
                {activityData?.contestTopPercentage && (
                  <span className="text-[10px] font-mono text-[#c8ff00] bg-[#c8ff00]/10 border border-[#c8ff00]/20 px-1.5 py-0.5 rounded">
                    {activityData.contestTopPercentage}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8a919e] font-mono mt-1">
                <Trophy className="h-3 w-3 text-[#c8ff00]" />
                <span>Contest Rating</span>
              </div>
            </div>
          </div>

          {/* Difficulty Distribution Bar & Primary DSA Topics */}
          <div className="mt-5 pt-4 border-t border-[#1f232c]">
            <div className="flex items-center justify-between text-xs text-[#8a919e] font-mono mb-2">
              <span className="text-white font-medium">Difficulty Distribution</span>
              <span>Primary Language: <strong className="text-white">Java</strong></span>
            </div>
            
            {/* Visual segmented progress bar */}
            <div className="h-2 w-full rounded-full bg-[#1b1e26] overflow-hidden flex">
              <div
                style={{ width: `${easyPercent}%` }}
                className="bg-[#00b8a3] h-full transition-all duration-700"
                title={`Easy: ${easySolved}`}
              />
              <div
                style={{ width: `${mediumPercent}%` }}
                className="bg-[#ffc01e] h-full transition-all duration-700"
                title={`Medium: ${mediumSolved}`}
              />
              <div
                style={{ width: `${hardPercent}%` }}
                className="bg-[#ff375f] h-full transition-all duration-700"
                title={`Hard: ${hardSolved}`}
              />
            </div>

            {/* Pattern / Topic Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-1 text-[11px] font-mono text-[#8a919e]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#646b7a]">Core Topics:</span>
                {["Arrays & Hashing", "Two Pointers", "Sliding Window", "Binary Search", "Trees & Graphs"].map(
                  (topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded bg-[#181a21] border border-[#262b36] text-[#b4bac7]"
                    >
                      {topic}
                    </span>
                  )
                )}
              </div>

              <div className="text-[11px] text-[#646b7a]">
                Verified on LeetCode
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
