"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, Download, Mail, ArrowUpRight, Code2, Layers, Cpu, X, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolioData";

interface QuickCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  action: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

export default function QuickCommandPalette({ isOpen, onClose }: QuickCommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Close on Escape & toggle on Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // handled by parent if wired
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const commands: CommandItem[] = useMemo(() => [
    {
      id: "resume",
      title: "Download Resume (PDF)",
      category: "ACTIONS",
      shortcut: "PDF",
      icon: Download,
      action: () => {
        window.open(PERSONAL_INFO.resumePath, "_blank");
        onClose();
      }
    },
    {
      id: "copy-email",
      title: "Copy Direct Email (hari.9506563662@gmail.com)",
      category: "ACTIONS",
      shortcut: "COPY",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        alert("Email copied to clipboard: " + PERSONAL_INFO.email);
        onClose();
      }
    },
    {
      id: "proj-skillshare",
      title: "SkillShare: Full Stack Learning Platform (Next.js, NestJS, Postgres)",
      category: "PROJECTS",
      icon: Layers,
      action: () => {
        const el = document.getElementById("projects");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "proj-edumeet",
      title: "EduMeet: Live Video and Chat Learning Platform (WebRTC, Socket.io)",
      category: "PROJECTS",
      icon: Layers,
      action: () => {
        const el = document.getElementById("projects");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "proj-library",
      title: "Library Management System (MERN, JWT, Fine Engine)",
      category: "PROJECTS",
      icon: Layers,
      action: () => {
        const el = document.getElementById("projects");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "activity",
      title: "View GitHub Activity & Submissions Heatmap",
      category: "NAVIGATION",
      icon: Terminal,
      action: () => {
        const el = document.getElementById("activity");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "skills",
      title: "View Technical Skills & CS Competencies",
      category: "NAVIGATION",
      icon: Cpu,
      action: () => {
        const el = document.getElementById("skills");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "github",
      title: "Open GitHub Profile (Omkumar9506)",
      category: "EXTERNAL",
      icon: GithubIcon,
      action: () => {
        window.open(PERSONAL_INFO.github, "_blank");
        onClose();
      }
    },
    {
      id: "linkedin",
      title: "Open LinkedIn Profile (omkumar9506)",
      category: "EXTERNAL",
      icon: LinkedinIcon,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, "_blank");
        onClose();
      }
    },
    {
      id: "leetcode",
      title: "Open LeetCode Profile (320+ Java Solutions)",
      category: "EXTERNAL",
      icon: Code2,
      action: () => {
        window.open(PERSONAL_INFO.leetcode, "_blank");
        onClose();
      }
    }
  ], [onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    return commands.filter((c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, commands]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-[#08090b]/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-2xl rounded-xl border border-[#20242e] bg-[#0c0e13] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-[#20242e] px-4 py-3.5 bg-[#101319]">
          <Search className="h-4 w-4 text-[#c8ff00] mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to project, skill, resume..."
            className="w-full bg-transparent font-mono text-sm text-[#f2f4f7] placeholder-[#606877] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-[#606877] hover:text-[#f2f4f7] transition-colors ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center font-mono text-xs text-[#606877]">
              No matching commands or projects found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full flex items-center justify-between rounded px-3 py-2.5 text-left font-mono text-xs transition-colors ${
                    idx === selectedIndex
                      ? "bg-[#181d26] text-[#c8ff00] border border-[#262e3d]"
                      : "text-[#9aa2b1] hover:bg-[#13161d] hover:text-[#f2f4f7]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-3.5 w-3.5 text-[#c8ff00] shrink-0" />
                    <span className="font-medium text-[#f2f4f7]">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#12151b] px-1.5 py-0.5 text-[10px] text-[#606877]">
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <kbd className="rounded bg-[#1a1e27] px-1.5 py-0.5 text-[10px] text-[#c8ff00] border border-[#2b3342]">
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#20242e] bg-[#090b0e] px-4 py-2 font-mono text-[11px] text-[#606877]">
          <span>Use ⌘K to toggle anytime</span>
          <span className="text-[#c8ff00]">Recruiter Command Terminal</span>
        </div>
      </div>
    </div>
  );
}
