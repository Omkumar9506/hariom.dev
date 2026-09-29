"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Activity", href: "#activity" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#20242e] bg-[#08090b]/85 backdrop-blur-md py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 font-mono text-sm tracking-tight text-[#f2f4f7] transition-opacity hover:opacity-90"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#161920] border border-[#20242e] font-mono font-bold text-xs text-[#c8ff00] group-hover:border-[#c8ff00] transition-colors">
            H
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide">
              HARIOM<span className="text-[#c8ff00]">.DEV</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-[#606877] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff00] animate-pulse" />
              OPEN FOR SDE / FULL-STACK
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-[#20242e] bg-[#0f1115]/90 px-3 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-full px-3.5 py-1 text-xs font-mono text-[#9aa2b1] transition-all hover:bg-[#161920] hover:text-[#f2f4f7]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick command palette trigger */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="hidden sm:flex items-center gap-2 rounded border border-[#20242e] bg-[#12151b] px-2.5 py-1.5 text-[11px] font-mono text-[#9aa2b1] hover:border-[#333a4a] hover:text-[#f2f4f7] transition-all"
            title="Press Cmd+K or Ctrl+K"
          >
            <Terminal className="h-3 w-3 text-[#c8ff00]" />
            <span>Search</span>
            <kbd className="rounded bg-[#1a1e27] px-1.5 py-0.5 text-[10px] text-[#606877]">⌘K</kbd>
          </button>

          {/* Download Resume Button */}
          <a
            href={PERSONAL_INFO.resumePath}
            download="Hariom_Kumar_Gupta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded bg-[#c8ff00] px-3.5 py-1.5 text-xs font-mono font-bold text-[#08090b] transition-all hover:bg-[#b5e600] active:scale-95 shadow-[0_0_15px_rgba(200,255,0,0.15)]"
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span>Resume</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center rounded p-1.5 text-[#9aa2b1] hover:text-[#f2f4f7]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#20242e] bg-[#0c0e12] px-4 py-4 space-y-2">
          <div className="flex items-center gap-2 pb-2 text-[11px] font-mono text-[#c8ff00]">
            <span className="h-2 w-2 rounded-full bg-[#c8ff00] animate-pulse" />
            <span>Available for Full-Time SDE Roles</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded border border-[#20242e] bg-[#12151b] px-3 py-2 text-xs font-mono text-[#9aa2b1] hover:text-[#c8ff00]"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded border border-[#20242e] bg-[#161920] py-2 text-xs font-mono text-[#9aa2b1]"
            >
              <Terminal className="h-3.5 w-3.5 text-[#c8ff00]" />
              Recruiter Quick Finder
            </button>
            <a
              href={PERSONAL_INFO.resumePath}
              download="Hariom_Kumar_Gupta_Resume.pdf"
              className="flex items-center justify-center gap-1.5 rounded bg-[#c8ff00] px-4 py-2 text-xs font-mono font-bold text-black"
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
