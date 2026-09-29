import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hariom Kumar Gupta | Full-Stack Developer & SDE",
  description:
    "Full-Stack Developer (MERN, Next.js, NestJS) building real-time WebRTC video platforms and PostgreSQL + Razorpay systems. Solved 320+ LeetCode problems in Java. Open to SDE & Full-Stack roles.",
  keywords: [
    "Hariom Kumar Gupta",
    "Full-Stack Developer",
    "Software Development Engineer",
    "SDE",
    "Next.js",
    "NestJS",
    "WebRTC",
    "React.js",
    "PostgreSQL",
    "Razorpay",
    "TypeScript",
    "MERN Stack",
    "LeetCode Java",
    "Lucknow"
  ],
  authors: [{ name: "Hariom Kumar Gupta", url: "https://github.com/Omkumar9506" }],
  creator: "Hariom Kumar Gupta",
  openGraph: {
    title: "Hariom Kumar Gupta | Full-Stack Developer & SDE",
    description:
      "Full-Stack Developer (MERN, Next.js, NestJS) building real-time WebRTC video platforms and PostgreSQL + Razorpay systems. Solved 320+ LeetCode problems in Java.",
    url: "https://hariom-portfolio.vercel.app",
    siteName: "Hariom Kumar Gupta Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariom Kumar Gupta | Full-Stack Developer & SDE",
    description:
      "Full-Stack Developer (MERN, Next.js, NestJS) building real-time WebRTC video platforms and PostgreSQL + Razorpay systems. Solved 320+ LeetCode problems in Java.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08090b] text-[#f2f4f7]">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
