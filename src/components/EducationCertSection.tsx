"use client";

import { GraduationCap, Award, MapPin, Calendar, CheckCircle } from "lucide-react";
import { EDUCATION_DATA, CERTIFICATIONS_DATA } from "@/data/portfolioData";

export default function EducationCertSection() {
  return (
    <section id="education" className="py-20 bg-[#08090b] border-b border-[#20242e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#c8ff00] mb-2">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>ACADEMICS &amp; INDUSTRY CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#f2f4f7]">
            Education &amp; Certification
          </h2>
          <p className="text-xs sm:text-sm text-[#9aa2b1] mt-1 font-mono">
            Formal engineering degree combined with continuous production-grade specialization.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Card */}
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#20242e] bg-[#0d0f14] p-6 sm:p-8 flex flex-col justify-between hover:border-[#384253] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[11px] text-[#c8ff00] bg-[#c8ff00]/10 px-2.5 py-1 rounded border border-[#c8ff00]/20 font-semibold">
                    FORMAL DEGREE
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#9aa2b1]">
                    <Calendar className="h-3.5 w-3.5 text-[#606877]" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#f2f4f7] mb-2">
                  {edu.degree}
                </h3>

                <div className="text-sm font-mono text-[#9aa2b1] mb-4 flex flex-wrap items-center gap-2">
                  <span className="text-[#f2f4f7] font-semibold">{edu.institution}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-[#606877]">
                    <MapPin className="h-3 w-3" />
                    {edu.location}
                  </span>
                </div>

                <div className="rounded border border-[#1e232e] bg-[#12151c] p-3.5 mb-6 font-mono text-xs flex items-center justify-between">
                  <span className="text-[#9aa2b1]">ACADEMIC AGGREGATE:</span>
                  <span className="text-base font-bold text-[#c8ff00]">{edu.score}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#9aa2b1] leading-relaxed mb-4">
                  {edu.description}
                </p>

                <ul className="space-y-2">
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-[#9aa2b1]">
                      <CheckCircle className="h-3.5 w-3.5 text-[#c8ff00] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1b1f28] flex items-center justify-between text-[11px] font-mono text-[#606877]">
                <span>DEGREE STATUS</span>
                <span className="text-[#f2f4f7]">IN PROGRESS (FINAL YEAR 2027)</span>
              </div>
            </div>
          ))}

          {/* Certification Card */}
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#20242e] bg-[#0d0f14] p-6 sm:p-8 flex flex-col justify-between hover:border-[#384253] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[11px] text-[#c8ff00] bg-[#c8ff00]/10 px-2.5 py-1 rounded border border-[#c8ff00]/20 font-semibold">
                    INDUSTRY CERTIFICATION
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#9aa2b1]">
                    <Calendar className="h-3.5 w-3.5 text-[#606877]" />
                    <span>{cert.year}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#f2f4f7] mb-2">
                  {cert.title}
                </h3>

                <div className="text-sm font-mono text-[#9aa2b1] mb-4 flex items-center gap-2">
                  <span className="text-[#f2f4f7] font-semibold">{cert.issuer}</span>
                  <span>•</span>
                  <span className="text-[#c8ff00] font-semibold">Verified Credential</span>
                </div>

                <div className="rounded border border-[#1e232e] bg-[#12151c] p-3.5 mb-6 font-mono text-xs flex items-center justify-between">
                  <span className="text-[#9aa2b1]">FOCUS:</span>
                  <span className="text-xs font-bold text-[#f2f4f7]">React 19, Next.js App Router &amp; SSR</span>
                </div>

                <p className="text-xs sm:text-sm text-[#9aa2b1] leading-relaxed mb-6">
                  {cert.description}
                </p>

                <div className="space-y-2">
                  <div className="font-mono text-[11px] text-[#606877] uppercase">
                    Key Competencies Mastered:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded border border-[#20242e] bg-[#14171f] px-2.5 py-1 font-mono text-xs text-[#f2f4f7]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1b1f28] flex items-center justify-between text-[11px] font-mono text-[#606877]">
                <span>VALIDATION</span>
                <span className="text-[#c8ff00]">COMPLETED 2025</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
