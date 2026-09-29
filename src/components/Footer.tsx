"use client";

import { Terminal, ArrowUp, Code2, Mail, Download } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#07080a] border-t border-[#20242e] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1b1f28]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#f2f4f7]">
              <span>HARIOM KUMAR GUPTA</span>
              <span className="text-[#606877]">/</span>
              <span className="text-[#c8ff00] text-xs font-normal">FULL-STACK ENGINEER</span>
            </div>
            <p className="text-xs font-mono text-[#9aa2b1]">
              Lucknow, Uttar Pradesh, India • Open to Relocation &amp; Remote SDE Roles
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#9aa2b1]">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c8ff00] transition-colors"
            >
              GitHub
            </a>
            <span className="text-[#20242e]">•</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c8ff00] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#20242e]">•</span>
            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#c8ff00] transition-colors"
            >
              LeetCode (320+ Java)
            </a>
            <span className="text-[#20242e]">•</span>
            <a
              href={PERSONAL_INFO.resumePath}
              download="Hariom_Kumar_Gupta_Resume.pdf"
              className="text-[#c8ff00] hover:underline font-bold"
            >
              Resume PDF
            </a>
          </div>
        </div>

        {/* Bottom Status & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#606877]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff00]" />
            <span>NO AI-TEMPLATE FLUFF • BUILT FROM SCRATCH WITH NEXT.JS 16 &amp; TAILWIND</span>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 text-[#9aa2b1] hover:text-[#c8ff00] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
