"use client";

import { useState } from "react";
import { ArrowUpRight, Terminal, ChevronDown, ChevronUp, Layers, CheckCircle2, Shield, Cpu, Activity } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectData } from "@/types/portfolio";

export default function ProjectShowcase() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("skillshare");

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-20 bg-[#08090b] border-b border-[#20242e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#c8ff00] mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>PRODUCTION SYSTEMS &amp; ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#f2f4f7]">
              Featured Engineering Work
            </h2>
            <p className="text-xs sm:text-sm text-[#9aa2b1] mt-1 font-mono max-w-2xl">
              Real-world systems handling asynchronous payment flows, sub-second WebRTC peer streams, and normalized relational persistence.
            </p>
          </div>

          <div className="font-mono text-xs text-[#606877] text-right hidden sm:block">
            <span>SHOWCASE // 01 — 03</span>
            <div className="text-[#c8ff00]">FULL REPOS &amp; DEMOS AVAILABLE</div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-10">
          {PROJECTS.map((project, index) => {
            const isExpanded = expandedProjectId === project.id;
            const projectNumber = `0${index + 1}`;

            return (
              <div
                key={project.id}
                className="group rounded-xl border border-[#20242e] bg-[#0d0f14] transition-all hover:border-[#384253] overflow-hidden"
              >
                {/* Project Header Bar */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-[#c8ff00]">
                        {projectNumber}
                      </span>
                      <span className="h-4 w-[1px] bg-[#20242e]" />
                      <span className="font-mono text-xs uppercase tracking-wider text-[#9aa2b1]">
                        {project.category}
                      </span>
                    </div>

                    <span className="rounded bg-[#c8ff00]/10 border border-[#c8ff00]/25 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#c8ff00]">
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f2f4f7] mb-2 group-hover:text-[#c8ff00] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#9aa2b1] leading-relaxed max-w-4xl mb-6">
                    {project.subtitle}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded border border-[#20242e] bg-[#14171e] px-2.5 py-1 font-mono text-xs text-[#f2f4f7]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Impact Metric Grid (Always visible for recruiter quick scanning) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {project.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded border border-[#1b1f28] bg-[#101319] p-3 text-center sm:text-left"
                      >
                        <div className="text-lg sm:text-xl font-bold font-mono text-[#f2f4f7]">
                          {metric.value}
                        </div>
                        <div className="text-[11px] font-mono text-[#9aa2b1] mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions & Expand Details Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1b1f28]">
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded bg-[#c8ff00] px-4 py-2 text-xs font-mono font-bold text-[#08090b] hover:bg-[#b5e600] transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded border border-[#20242e] bg-[#13161c] px-4 py-2 text-xs font-mono text-[#f2f4f7] hover:border-[#c8ff00] transition-colors"
                      >
                        <GithubIcon className="h-3.5 w-3.5 text-[#c8ff00]" />
                        <span>Source Code</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="inline-flex items-center gap-2 font-mono text-xs text-[#9aa2b1] hover:text-[#c8ff00] transition-colors"
                    >
                      <span>{isExpanded ? "Collapse Architecture" : "Inspect System Architecture"}</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Deep-Dive Panel (Problem, Solution, Architecture & Terminal Snippet) */}
                {isExpanded && (
                  <div className="border-t border-[#20242e] bg-[#090b0e] p-6 sm:p-8 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Problem & Solution Architecture (7 cols) */}
                      <div className="lg:col-span-7 space-y-6">
                        <div>
                          <div className="flex items-center gap-2 font-mono text-xs text-[#c8ff00] mb-1.5 uppercase font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff00]" />
                            The Engineering Problem
                          </div>
                          <p className="text-xs sm:text-sm text-[#9aa2b1] leading-relaxed">
                            {project.problem}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 font-mono text-xs text-[#c8ff00] mb-1.5 uppercase font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff00]" />
                            The Architectural Solution
                          </div>
                          <p className="text-xs sm:text-sm text-[#9aa2b1] leading-relaxed">
                            {project.solution}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 font-mono text-xs text-[#c8ff00] mb-1.5 uppercase font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff00]" />
                            Database &amp; Protocol Design
                          </div>
                          <p className="text-xs sm:text-sm text-[#9aa2b1] leading-relaxed">
                            {project.architecture}
                          </p>
                        </div>

                        <div>
                          <div className="font-mono text-xs text-[#f2f4f7] font-semibold uppercase mb-3">
                            Key Functional Implementation:
                          </div>
                          <ul className="space-y-2">
                            {project.keyFeatures.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#9aa2b1]">
                                <CheckCircle2 className="h-4 w-4 text-[#c8ff00] shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right: Terminal Code Snippet (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col">
                        <div className="rounded border border-[#20242e] bg-[#0c0e13] overflow-hidden flex flex-col h-full">
                          {/* Snippet Header */}
                          <div className="flex items-center justify-between border-b border-[#20242e] bg-[#12151c] px-4 py-2 font-mono text-xs text-[#9aa2b1]">
                            <div className="flex items-center gap-2">
                              <Terminal className="h-3.5 w-3.5 text-[#c8ff00]" />
                              <span>core_engine.ts</span>
                            </div>
                            <span className="text-[10px] text-[#606877]">READ-ONLY</span>
                          </div>

                          {/* Code Content */}
                          <div className="p-4 font-mono text-xs text-[#f2f4f7] overflow-x-auto flex-1 bg-[#090b0e]">
                            <pre className="text-[12px] leading-relaxed text-[#9aa2b1]">
                              <code>{project.terminalCodeSnippet}</code>
                            </pre>
                          </div>

                          <div className="border-t border-[#1b1f28] px-4 py-2.5 bg-[#0f1218] flex items-center justify-between text-[11px] font-mono text-[#606877]">
                            <span>IDEMPOTENT EXECUTION</span>
                            <span className="text-[#c8ff00]">VERIFIED</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
