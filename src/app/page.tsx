"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import LeetCodeActivitySection from "@/components/LeetCodeActivitySection";
import ProjectShowcase from "@/components/ProjectShowcase";
import SkillsSection from "@/components/SkillsSection";
import EducationCertSection from "@/components/EducationCertSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import QuickCommandPalette from "@/components/QuickCommandPalette";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#08090b] text-[#f2f4f7] selection:bg-[#c8ff00] selection:text-[#08090b]">
      {/* High-precision interactive custom cursor */}
      <CustomCursor />

      {/* Recruiter quick command palette modal */}
      <QuickCommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Sticky minimal header */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main page content structured for 30s recruiter scan */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero: Name, Role, One-line pitch, Resume download & Contact */}
        <HeroSection />

        {/* 2. GitHub Activity: LeetCode-style contribution heatmap */}
        <GitHubActivitySection />

        {/* 3. LeetCode Activity: Problem solving submissions heatmap */}
        <LeetCodeActivitySection />

        {/* 4. Featured Projects: SkillShare, EduMeet, Library Management System */}
        <ProjectShowcase />

        {/* 5. Skills and Tools: Categorized, no percentage bars */}
        <SkillsSection />

        {/* 6. Education & Certification: AKTU B.Tech IT & Udemy Next.js */}
        <EducationCertSection />

        {/* 7. Contact Section: Email, LinkedIn, GitHub, LeetCode (NO phone number) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
