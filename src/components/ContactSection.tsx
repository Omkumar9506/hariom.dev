"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight, Code2, Download, MapPin, Send, AlertCircle, CheckCircle2, Loader2, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to deliver message. Please try again or email directly.");
        if (data.details) {
          setFieldErrors(data.details);
        }
        return;
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Network error occurred. Please contact directly via email.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#090a0d] border-b border-[#20242e] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#c8ff00] bg-[#c8ff00]/10 px-3 py-1.5 rounded border border-[#c8ff00]/20 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#c8ff00] animate-pulse" />
            <span>COMMUNICATION CHANNEL // INBOX MONITORED</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#f2f4f7] leading-tight">
            Let&apos;s Build Systems <br />
            <span className="text-[#c8ff00]">That Don&apos;t Break.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9aa2b1] max-w-3xl mt-2 leading-relaxed">
            I am actively looking for <span className="text-[#f2f4f7] font-semibold">SDE / Full-Stack Engineer</span> opportunities.
            Send a message via the form below or reach out directly through email, LinkedIn, or GitHub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Links & Fast Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Email Card */}
            <div className="rounded-xl border border-[#20242e] bg-[#0d0f14] p-5 hover:border-[#384253] transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-mono text-xs text-[#606877]">
                  <Mail className="h-3.5 w-3.5 text-[#c8ff00]" />
                  <span>DIRECT EMAIL</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#c8ff00] hover:underline"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="font-mono text-sm sm:text-base font-bold text-[#f2f4f7] break-all">
                {PERSONAL_INFO.email}
              </div>

              <div className="mt-3 pt-3 border-t border-[#1b1f28] flex items-center justify-between text-xs font-mono text-[#9aa2b1]">
                <span>Response: 4–8h</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-1 text-[#c8ff00] hover:underline"
                >
                  <span>Open Client</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Meta Location & Resume */}
            <div className="rounded-xl border border-[#20242e] bg-[#0d0f14] p-5 space-y-3 font-mono text-xs text-[#9aa2b1]">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#c8ff00] shrink-0" />
                <span>Lucknow, Uttar Pradesh, India (Open to Relocation &amp; Remote)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Send className="h-4 w-4 text-[#c8ff00] shrink-0" />
                <span>Availability: Immediate for SDE / Full-Stack Roles</span>
              </div>
              <div className="pt-2 border-t border-[#1b1f28] flex gap-2">
                <a
                  href={PERSONAL_INFO.resumePath}
                  download="Hariom_Kumar_Gupta_Resume.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 rounded bg-[#c8ff00] py-2 text-xs font-mono font-bold text-[#08090b] hover:bg-[#b5e600] transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-[#20242e] bg-[#0d0f14] p-4 hover:border-[#c8ff00] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-[#141822] p-2 text-[#c8ff00]">
                    <LinkedinIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-[#606877]">PROFESSIONAL NETWORK</div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-[#f2f4f7] group-hover:text-[#c8ff00] transition-colors">
                      linkedin.com/in/omkumar9506
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#606877] group-hover:text-[#c8ff00] transition-colors" />
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-[#20242e] bg-[#0d0f14] p-4 hover:border-[#c8ff00] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-[#141822] p-2 text-[#c8ff00]">
                    <GithubIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-[#606877]">SOURCE REPOSITORIES</div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-[#f2f4f7] group-hover:text-[#c8ff00] transition-colors">
                      github.com/Omkumar9506
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#606877] group-hover:text-[#c8ff00] transition-colors" />
              </div>
            </a>

            {/* LeetCode Card (Static link only, no live stats) */}
            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-[#20242e] bg-[#0d0f14] p-4 hover:border-[#c8ff00] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-[#141822] p-2 text-[#c8ff00]">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-[#606877]">ALGORITHMIC PRACTICE</div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-[#f2f4f7] group-hover:text-[#c8ff00] transition-colors">
                      leetcode.com/omkumar95065
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#606877] group-hover:text-[#c8ff00] transition-colors" />
              </div>
            </a>
          </div>

          {/* Right Column: Interactive Terminal Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#20242e] bg-[#0d0f14] overflow-hidden shadow-2xl">
              {/* Form Terminal Bar */}
              <div className="flex items-center justify-between border-b border-[#20242e] bg-[#12151c] px-5 py-3 font-mono text-xs text-[#9aa2b1]">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-[#c8ff00]" />
                  <span className="font-semibold text-[#f2f4f7]">MESSAGE_DISPATCHER.TS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#c8ff00] animate-pulse" />
                  <span className="text-[10px] text-[#c8ff00]">VALIDATED (ZOD) • RATE-LIMITED</span>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 sm:p-8">
                {status === "success" ? (
                  <div className="rounded-lg border border-[#c8ff00]/30 bg-[#c8ff00]/5 p-6 text-center space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#c8ff00]/15 text-[#c8ff00]">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-mono text-[#f2f4f7]">
                        DISPATCH SUCCESSFUL
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9aa2b1] mt-1 font-mono max-w-md mx-auto">
                        Your message has been transmitted and queued. I will review your requirements and respond directly to your email.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center gap-2 rounded border border-[#20242e] bg-[#141822] px-4 py-2 font-mono text-xs text-[#f2f4f7] hover:border-[#c8ff00] transition-colors"
                    >
                      <span>Send Another Message</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Error Alert */}
                    {status === "error" && errorMessage && (
                      <div className="rounded border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-mono text-red-400 flex items-start gap-2.5">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                        <div>
                          <div className="font-semibold">Transmission Failed:</div>
                          <div>{errorMessage}</div>
                        </div>
                      </div>
                    )}

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block font-mono text-xs text-[#9aa2b1] mb-1.5"
                        >
                          <span className="text-[#c8ff00]">[01]</span> YOUR NAME *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Sarah Jenkins (Recruiter)"
                          className={`w-full rounded border bg-[#12151c] px-3.5 py-2.5 font-mono text-xs text-[#f2f4f7] placeholder-[#606877] focus:outline-none transition-colors ${
                            fieldErrors.name
                              ? "border-red-500 focus:border-red-400"
                              : "border-[#20242e] focus:border-[#c8ff00]"
                          }`}
                        />
                        {fieldErrors.name && (
                          <p className="mt-1 text-[11px] font-mono text-red-400">
                            {fieldErrors.name[0]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block font-mono text-xs text-[#9aa2b1] mb-1.5"
                        >
                          <span className="text-[#c8ff00]">[02]</span> EMAIL ADDRESS *
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          className={`w-full rounded border bg-[#12151c] px-3.5 py-2.5 font-mono text-xs text-[#f2f4f7] placeholder-[#606877] focus:outline-none transition-colors ${
                            fieldErrors.email
                              ? "border-red-500 focus:border-red-400"
                              : "border-[#20242e] focus:border-[#c8ff00]"
                          }`}
                        />
                        {fieldErrors.email && (
                          <p className="mt-1 text-[11px] font-mono text-red-400">
                            {fieldErrors.email[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block font-mono text-xs text-[#9aa2b1] mb-1.5"
                      >
                        <span className="text-[#c8ff00]">[03]</span> SUBJECT / INQUIRY TOPIC
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. SDE-1 Full-Stack Position at Company"
                        className="w-full rounded border border-[#20242e] bg-[#12151c] px-3.5 py-2.5 font-mono text-xs text-[#f2f4f7] placeholder-[#606877] focus:border-[#c8ff00] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block font-mono text-xs text-[#9aa2b1] mb-1.5"
                      >
                        <span className="text-[#c8ff00]">[04]</span> MESSAGE BODY *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about the role, technical challenge, or project timeline..."
                        className={`w-full rounded border bg-[#12151c] px-3.5 py-2.5 font-mono text-xs text-[#f2f4f7] placeholder-[#606877] focus:outline-none transition-colors resize-y ${
                          fieldErrors.message
                            ? "border-red-500 focus:border-red-400"
                            : "border-[#20242e] focus:border-[#c8ff00]"
                        }`}
                      />
                      {fieldErrors.message && (
                        <p className="mt-1 text-[11px] font-mono text-red-400">
                          {fieldErrors.message[0]}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-[11px] font-mono text-[#606877]">
                        <span>POST /api/contact • Rate limit: 4 req / 10m</span>
                      </div>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex items-center justify-center gap-2 rounded bg-[#c8ff00] px-6 py-3 font-mono text-xs font-bold text-[#08090b] hover:bg-[#b5e600] active:scale-95 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(200,255,0,0.15)]"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>TRANSMITTING...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            <span>SEND TRANSMISSION</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
