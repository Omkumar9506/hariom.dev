"use client";

import { useState } from "react";
import { Download, Mail, ArrowUpRight, Check, Copy, Terminal, ShieldCheck, Database, Radio, Code2 } from "lucide-react";
import InteractiveCanvas from "./InteractiveCanvas";
import { PERSONAL_INFO, RECRUITER_HIGHLIGHTS } from "@/data/portfolioData";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[#20242e]">
      {/* Background Interactive Mesh (1 effect only, reacts to mouse) */}
      <InteractiveCanvas />

      {/* Engineering Grid Overlay */}
      <div className="tech-grid-bg absolute inset-0 pointer-events-none opacity-40" />

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Terminal Header Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#9aa2b1]">
          <div className="inline-flex items-center gap-2 rounded border border-[#20242e] bg-[#0d0f14]/80 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#c8ff00] animate-pulse" />
            <span className="text-[#f2f4f7] font-semibold">CANDIDATE_ID:</span>
            <span className="text-[#c8ff00]">HARIOM_KUMAR_GUPTA</span>
            <span className="text-[#606877]">|</span>
            <span className="hidden sm:inline text-[#9aa2b1]">LUCKNOW, UP, IN</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-3 text-[#606877]">
            <span>ENV: PRODUCTION</span>
            <span>•</span>
            <span>STACK: MERN + NEXT.JS + NESTJS</span>
          </div>
        </div>

        {/* Hero Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Headline & Direct Proposition (7 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-[#c8ff00]">
                Full-Stack Developer & SDE Candidate
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f2f4f7] uppercase leading-[0.95]">
                Hariom Kumar <br />
                <span className="text-[#c8ff00] underline decoration-[#c8ff00]/40 decoration-wavy underline-offset-8">
                  Gupta
                </span>
              </h1>
            </div>

            {/* Human, Opinionated, Non-generic pitch */}
            <p className="text-base sm:text-lg text-[#9aa2b1] max-w-2xl leading-relaxed">
              I don&apos;t just stitch APIs together; I architect systems that handle real money and real-time streams.
              Built a multi-tenant <span className="text-[#f2f4f7] font-medium">PostgreSQL + NestJS LMS</span> with
              Razorpay webhooks &amp; automated certification, and a <span className="text-[#f2f4f7] font-medium">50+ user WebRTC video engine</span>.
              Backed by <span className="text-[#c8ff00] font-mono font-medium">320+ LeetCode problems</span> solved in Java.
            </p>

            {/* Action Buttons & Fast Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Download Resume */}
              <a
                href={PERSONAL_INFO.resumePath}
                download="Hariom_Kumar_Gupta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded bg-[#c8ff00] px-5 py-3 text-sm font-mono font-bold text-[#08090b] transition-all hover:bg-[#b5e600] active:scale-95 shadow-[0_0_20px_rgba(200,255,0,0.2)]"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Download Resume (PDF)</span>
              </a>

              {/* Direct Mailto */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group inline-flex items-center gap-2 rounded border border-[#20242e] bg-[#12151b] px-4 py-3 text-sm font-mono text-[#f2f4f7] hover:border-[#c8ff00] hover:bg-[#161a22] transition-all"
              >
                <Mail className="h-4 w-4 text-[#c8ff00]" />
                <span>Contact Direct</span>
              </a>

              {/* 1-Click Copy Email */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded border border-[#20242e] bg-[#0d0f14] px-3.5 py-3 text-sm font-mono text-[#9aa2b1] hover:text-[#f2f4f7] hover:border-[#333a4a] transition-all"
                title="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#c8ff00]" />
                    <span className="text-xs text-[#c8ff00]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#606877]" />
                    <span className="text-xs">Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Recruiter Quick Proof Signals */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-[#9aa2b1]">
              <span className="text-[#606877]">VERIFY DIRECT:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded bg-[#12151b] border border-[#20242e] px-2.5 py-1 text-[#f2f4f7] hover:border-[#c8ff00] transition-colors"
              >
                GitHub <ArrowUpRight className="h-3 w-3 text-[#c8ff00]" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded bg-[#12151b] border border-[#20242e] px-2.5 py-1 text-[#f2f4f7] hover:border-[#c8ff00] transition-colors"
              >
                LinkedIn <ArrowUpRight className="h-3 w-3 text-[#c8ff00]" />
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded bg-[#12151b] border border-[#20242e] px-2.5 py-1 text-[#f2f4f7] hover:border-[#c8ff00] transition-colors"
              >
                LeetCode (320+ Java) <ArrowUpRight className="h-3 w-3 text-[#c8ff00]" />
              </a>
            </div>
          </div>

          {/* Right Column: 30-Second Recruiter Fast-Track Card (5 cols) */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-[#20242e] bg-[#0f1115]/90 backdrop-blur-md p-5 shadow-2xl relative overflow-hidden">
              {/* Card top banner */}
              <div className="flex items-center justify-between border-b border-[#20242e] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[#c8ff00]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f2f4f7]">
                    30-Second Recruiter Summary
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#c8ff00] bg-[#c8ff00]/10 px-2 py-0.5 rounded border border-[#c8ff00]/20">
                  VERIFIED
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-3.5 font-mono text-xs">
                <div className="flex items-start gap-3 rounded border border-[#1e222a] bg-[#14171d] p-3">
                  <div className="mt-0.5 rounded bg-[#c8ff00]/10 p-1.5 text-[#c8ff00]">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-[#f2f4f7]">320+ Solved</span>
                      <span className="text-[11px] text-[#c8ff00]">LeetCode (Java)</span>
                    </div>
                    <p className="text-[11px] text-[#9aa2b1] mt-0.5 leading-snug">
                      Arrays, Linked Lists, Trees, Binary Search, Two-Pointer, Sliding Window.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded border border-[#1e222a] bg-[#14171d] p-3">
                  <div className="mt-0.5 rounded bg-[#c8ff00]/10 p-1.5 text-[#c8ff00]">
                    <Radio className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-[#f2f4f7]">50+ Peers</span>
                      <span className="text-[11px] text-[#c8ff00]">WebRTC + Socket.io</span>
                    </div>
                    <p className="text-[11px] text-[#9aa2b1] mt-0.5 leading-snug">
                      Sub-second latency classroom video &amp; synchronized state engine.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded border border-[#1e222a] bg-[#14171d] p-3">
                  <div className="mt-0.5 rounded bg-[#c8ff00]/10 p-1.5 text-[#c8ff00]">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-[#f2f4f7]">PostgreSQL + NestJS</span>
                      <span className="text-[11px] text-[#c8ff00]">Razorpay + RBAC</span>
                    </div>
                    <p className="text-[11px] text-[#9aa2b1] mt-0.5 leading-snug">
                      6 relational entities, idempotent payments, automated dynamic PDF certs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded border border-[#1e222a] bg-[#14171d] p-3">
                  <div className="mt-0.5 rounded bg-[#c8ff00]/10 p-1.5 text-[#c8ff00]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-[#f2f4f7]">AKTU IT (72.56%)</span>
                      <span className="text-[11px] text-[#c8ff00]">B.Tech 2027</span>
                    </div>
                    <p className="text-[11px] text-[#9aa2b1] mt-0.5 leading-snug">
                      Lucknow, India • Udemy Full-Stack React &amp; Next.js Certified (2025).
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#20242e] flex items-center justify-between text-[11px] font-mono text-[#606877]">
                <span>Status: READY TO DEPLOY</span>
                <span className="text-[#c8ff00]">SDE-1 / FULL-STACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
