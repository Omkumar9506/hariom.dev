"use client";

import { useState, useMemo } from "react";
import { Terminal, Search, Cpu, CheckCircle } from "lucide-react";
import { SKILL_GROUPS, PERSONAL_INFO } from "@/data/portfolioData";

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    return ["ALL", ...SKILL_GROUPS.map((g) => g.category)];
  }, []);

  const filteredGroups = useMemo(() => {
    return SKILL_GROUPS.map((group) => {
      // Category filter
      if (selectedCategory !== "ALL" && group.category !== selectedCategory) {
        return null;
      }

      // Search query filter
      if (!searchQuery.trim()) return group;

      const matchingSkills = group.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.badge && skill.badge.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (matchingSkills.length === 0) return null;

      return {
        ...group,
        skills: matchingSkills
      };
    }).filter(Boolean) as typeof SKILL_GROUPS;
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 bg-[#090a0d] border-b border-[#20242e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#c8ff00] mb-2">
              <Cpu className="h-3.5 w-3.5" />
              <span>CORE COMPETENCIES // NO ARBITRARY PERCENTAGE BARS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#f2f4f7]">
              Technical Skills &amp; Domain Expertise
            </h2>
            <p className="text-xs sm:text-sm text-[#9aa2b1] mt-1 font-mono">
              Grouped by functional systems domain. High proficiency backed by actual projects and 320+ DSA solutions.
            </p>
          </div>

          {/* Quick Skill Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#606877]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Java, WebRTC)..."
              className="w-full rounded border border-[#20242e] bg-[#12151b] pl-9 pr-3 py-2 text-xs font-mono text-[#f2f4f7] placeholder-[#606877] focus:border-[#c8ff00] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded px-3 py-1.5 font-mono text-xs transition-all ${
                selectedCategory === cat
                  ? "bg-[#c8ff00] text-[#08090b] font-bold shadow-[0_0_12px_rgba(200,255,0,0.2)]"
                  : "border border-[#20242e] bg-[#101217] text-[#9aa2b1] hover:text-[#f2f4f7] hover:border-[#384253]"
              }`}
            >
              {cat === "ALL" ? "All Domains" : cat}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.categoryCode}
              className="rounded-xl border border-[#20242e] bg-[#0d0f14] p-5 transition-all hover:border-[#333a4a] hover:shadow-lg"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between border-b border-[#1b1f28] pb-3 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f2f4f7]">
                  {group.category}
                </span>
                <span className="font-mono text-[10px] text-[#c8ff00] bg-[#c8ff00]/10 px-2 py-0.5 rounded border border-[#c8ff00]/20">
                  {group.categoryCode}
                </span>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-xs transition-all ${
                      skill.highlight
                        ? "border border-[#2b3342] bg-[#141822] text-[#f2f4f7] hover:border-[#c8ff00]"
                        : "border border-[#1d222b] bg-[#101319] text-[#9aa2b1]"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff00]" />
                    <span className="font-medium">{skill.name}</span>
                    {skill.badge && (
                      <span className="rounded bg-[#c8ff00]/15 px-1.5 py-0.2 text-[10px] text-[#c8ff00] font-bold ml-1">
                        {skill.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LeetCode Special Callout Banner (Recruiter Scannable) */}
        <div className="mt-10 rounded-xl border border-[#c8ff00]/30 bg-gradient-to-r from-[#12160d] to-[#0d0f14] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#c8ff00]">
              <span className="h-2 w-2 rounded-full bg-[#c8ff00] animate-pulse" />
              <span>ALGORITHMIC PROBLEM SOLVING // JAVA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f2f4f7]">
              320+ LeetCode DSA Problems Solved in Java
            </h3>
            <p className="text-xs sm:text-sm text-[#9aa2b1] font-mono">
              Core patterns: Arrays, Linked Lists, Binary Trees, Binary Search, Two-Pointer, Sliding Window, Dynamic Programming fundamentals.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded bg-[#c8ff00] px-5 py-2.5 font-mono text-xs font-bold text-[#08090b] hover:bg-[#b5e600] transition-colors"
          >
            <span>View LeetCode Profile</span>
          </a>
        </div>
      </div>
    </section>
  );
}
