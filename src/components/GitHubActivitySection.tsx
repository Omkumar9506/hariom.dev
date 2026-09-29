"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Activity } from "lucide-react";
import { GitHubActivityData, ContributionDay } from "@/types/portfolio";

function useCountUp(end: number, duration: number = 900): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
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

function formatDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function GitHubActivitySection() {
  const [selectedYear, setSelectedYear] = useState<string>("Current");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activityData, setActivityData] = useState<GitHubActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  // Tooltip state
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Available year selections: Current + past 3 calendar years
  const currentYearNum = new Date().getFullYear();
  const yearOptions = ["Current", (currentYearNum - 1).toString(), (currentYearNum - 2).toString(), (currentYearNum - 3).toString()];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Fetch activity data on year change
  useEffect(() => {
    let isCancelled = false;
    async function loadData() {
      setLoading(true);
      setHoveredDay(null);
      try {
        const res = await fetch(`/api/github/${selectedYear}`);
        if (res.ok) {
          const data: GitHubActivityData = await res.json();
          if (!isCancelled) {
            setActivityData(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch GitHub activity:", err);
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
  }, [selectedYear]);

  const animatedRepos = useCountUp(activityData?.publicRepos || 0);
  const animatedTotal = useCountUp(activityData?.totalContributions || 0);
  const animatedActiveDays = useCountUp(activityData?.totalActiveDays || 0);
  const animatedStreak = useCountUp(activityData?.maxStreak || 0);

  // Cell color helper (LeetCode-style green thresholds)
  const getCellColor = (level: 0 | 1 | 2 | 3 | 4) => {
    switch (level) {
      case 1:
        return "bg-[#1c4826]";
      case 2:
        return "bg-[#247333]";
      case 3:
        return "bg-[#2faa4c]";
      case 4:
        return "bg-[#43d562]";
      default:
        return "bg-[#22252d]";
    }
  };

  return (
    <section id="activity" className="py-20 bg-[#08090b] border-b border-[#20242e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#c8ff00] mb-3">
          <Activity className="h-3.5 w-3.5" />
          <span>DEVELOPER TELEMETRY // GITHUB ACTIVITY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#f2f4f7] mb-8">
          Code Submissions &amp; Activity
        </h2>

        {/* LeetCode-Style Submission Heatmap Card */}
        <div
          ref={containerRef}
          className="relative rounded-xl border border-[#232732] bg-[#111317] p-5 sm:p-6 shadow-xl"
        >
          {/* Top Row: Keep existing header line */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#1f232c] mb-6">
            {/* Left: Contributions Count */}
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {loading ? "--" : animatedTotal.toLocaleString()}
              </span>
              <span className="text-[#8a919e] text-xs sm:text-sm ml-2 font-normal">
                contributions in {selectedYear === "Current" ? "the past one year" : selectedYear}
              </span>
            </div>

            {/* Right: Active Days, Max Streak, Year Dropdown */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="text-[#8a919e]">
                Total active days:{" "}
                <span className="text-white font-medium ml-1">
                  {loading ? "--" : animatedActiveDays}
                </span>
              </div>

              <div className="text-[#8a919e]">
                Max streak:{" "}
                <span className="text-white font-medium ml-1">
                  {loading ? "--" : `${animatedStreak}`}
                </span>
              </div>

              {/* Year Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded border border-[#2b303c] bg-[#181a21] px-3 py-1.5 text-xs text-white hover:border-[#3d4454] transition-colors"
                >
                  <span>{selectedYear}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#8a919e]" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-30 w-28 rounded-lg border border-[#2b303c] bg-[#161820] py-1 shadow-2xl animate-fadeIn">
                    {yearOptions.map((yearOpt) => (
                      <button
                        key={yearOpt}
                        onClick={() => {
                          setSelectedYear(yearOpt);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-left text-xs transition-colors ${
                          selectedYear === yearOpt
                            ? "bg-[#222530] text-[#c8ff00] font-medium"
                            : "text-[#9aa2b1] hover:bg-[#1c1f28] hover:text-white"
                        }`}
                      >
                        <span>{yearOpt}</span>
                        {selectedYear === yearOpt && <Check className="h-3 w-3 text-[#c8ff00]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Heatmap Area: Month Groups with Visible Gaps Exactly like LeetCode */}
          <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin">
            {loading ? (
              // Skeleton Loader
              <div className="flex gap-3 min-w-[780px] animate-pulse py-2">
                {Array.from({ length: 12 }).map((_, mIdx) => (
                  <div key={mIdx} className="flex flex-col items-center gap-2">
                    <div className="flex gap-[3px]">
                      {Array.from({ length: 4 }).map((_, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                          {Array.from({ length: 7 }).map((_, dIdx) => (
                            <div
                              key={dIdx}
                              className="h-[10px] w-[10px] sm:h-[11px] sm:w-[11px] rounded-[2px] bg-[#1c1f26]"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="h-3 w-6 rounded bg-[#1c1f26]" />
                  </div>
                ))}
              </div>
            ) : (
              // Real Heatmap Grid with LeetCode Month Separation
              <div className="flex gap-3 sm:gap-3.5 min-w-[780px] justify-start py-2">
                {activityData?.months.map((month) => (
                  <div key={`${month.year}-${month.name}`} className="flex flex-col items-center">
                    {/* 7-Row Week Columns for this month */}
                    <div className="flex gap-[3px]">
                      {month.weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                          {week.days.map((day, dIdx) => {
                            if (!day) {
                              // Empty placeholder cell for days outside this month
                              return (
                                <div
                                  key={dIdx}
                                  className="h-[10px] w-[10px] sm:h-[11px] sm:w-[11px] rounded-[2px] opacity-0 pointer-events-none"
                                />
                              );
                            }

                            return (
                              <div
                                key={dIdx}
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setHoveredDay({
                                    day,
                                    x: rect.left + rect.width / 2,
                                    y: rect.top,
                                  });
                                }}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`h-[10px] w-[10px] sm:h-[11px] sm:w-[11px] rounded-[2px] cursor-pointer transition-transform hover:scale-125 ${getCellColor(
                                  day.level
                                )}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Month Label below the heatmap, aligned with each month block */}
                    <span className="mt-2 text-[11px] text-[#717886] font-medium select-none">
                      {month.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Three Key Stats: Compact Row of Cards directly below the heatmap */}
          <div className="mt-6 pt-5 border-t border-[#1f232c] grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Stat 1: Public repositories */}
            <div className="rounded-lg border border-[#232732] bg-[#161820] p-4 text-center sm:text-left transition-all hover:border-[#333a4a]">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                {loading ? <span className="animate-pulse text-[#4a5264]">--</span> : animatedRepos}
              </div>
              <div className="text-xs text-[#8a919e] font-mono mt-1">
                Public repositories
              </div>
            </div>

            {/* Stat 2: Total contributions */}
            <div className="rounded-lg border border-[#232732] bg-[#161820] p-4 text-center sm:text-left transition-all hover:border-[#333a4a]">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                {loading ? <span className="animate-pulse text-[#4a5264]">--</span> : animatedTotal.toLocaleString()}
              </div>
              <div className="text-xs text-[#8a919e] font-mono mt-1">
                Total contributions
              </div>
            </div>

            {/* Stat 3: Max streak */}
            <div className="rounded-lg border border-[#232732] bg-[#161820] p-4 text-center sm:text-left transition-all hover:border-[#333a4a]">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                {loading ? <span className="animate-pulse text-[#4a5264]">--</span> : `${animatedStreak} days`}
              </div>
              <div className="text-xs text-[#8a919e] font-mono mt-1">
                Max streak
              </div>
            </div>
          </div>

          {/* LeetCode-style Dark Tooltip with Down Arrow */}
          {hoveredDay && (
            <div
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full pb-2 animate-fadeIn"
              style={{
                left: `${hoveredDay.x}px`,
                top: `${hoveredDay.y}px`,
              }}
            >
              <div className="relative rounded bg-[#1e222a] px-2.5 py-1 text-[11px] text-white shadow-2xl border border-[#333947] whitespace-nowrap">
                <span className="font-semibold text-white">
                  {hoveredDay.day.count}{" "}
                  {hoveredDay.day.count === 1 ? "contribution" : "contributions"}
                </span>{" "}
                on {formatDate(hoveredDay.day.date)}
                {/* Down arrow triangle */}
                <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#1e222a]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
