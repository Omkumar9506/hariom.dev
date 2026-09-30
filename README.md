# Hariom Kumar Gupta — Full-Stack Developer & SDE Portfolio

An anti-template, recruiter-optimized personal developer portfolio engineered to let hiring managers and tech recruiters scan candidate qualifications in 30 seconds and shortlist immediately.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Lenis**, and **Zod** + **Resend** for contact form delivery.

---

## ⚡ Key Highlights (The 30-Second Scan)
- **Candidate:** Hariom Kumar Gupta
- **Role:** Full-Stack Developer (MERN, Next.js, NestJS) — Open to SDE & Full-Stack roles
- **Location:** Lucknow, Uttar Pradesh, India (Open to Relocation & Remote)
- **Competitive Programming:** **320+ LeetCode problems solved in Java** (Arrays, Linked Lists, Trees, Binary Search, Two-Pointer, Sliding Window)
- **Real-Time Systems:** Built **EduMeet**, a 50+ concurrent peer WebRTC video & chat platform
- **Financial Architecture:** Built **SkillShare**, a multi-role LMS on PostgreSQL + NestJS with Razorpay webhooks & automated PDF certification
- **Academics:** B.Tech in Information Technology, Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow (Aggregate 72.56%, Expected 2027)

---

<!-- ## 🚀 Design Architecture (Anti "AI-Look")
- **Monochrome & Volt Accent:** Zero generic purple-blue gradients or frosted glassmorphism spam. Deep obsidian (`#08090b`), muted charcoal panels (`#0d0f14`), and high-contrast tactical acid volt (`#c8ff00`).
- **LeetCode-Style Activity Heatmap:** Recreates the exact LeetCode profile submission heatmap card using GitHub GraphQL telemetry: month groupings with visible gaps, year dropdown (Current / past 3 years), active days, max streak, and dark hover tooltips with arrows.
- **Interactive Canvas Hero Mesh:** 60fps lightweight particle-mesh reacting elastically to mouse proximity, respecting `prefers-reduced-motion`.
- **Recruiter Fast-Track Command Palette:** Instant keyboard modal (`⌘K` or `Ctrl+K`) for recruiters to download resumes, copy email, or jump to project repos in 1 keystroke.
- **Custom Precision Cursor:** Smooth spring-trailing dot & ring with hover states on interactive controls (disabled on touch/mobile devices).
- **Downloadable Resume:** Direct PDF download bundled at `/public/resume.pdf`.

---

## 📂 Project Structure

```
d:/Projects/Portfolito/
├── public/
│   └── resume.pdf                 # Generated 1-page professional resume PDF
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts       # Zod validation + Rate Limiter + Resend email dispatch
│   │   │   └── github/
│   │   │       └── [year]/
│   │   │           └── route.ts   # Server-side GitHub GraphQL proxy with LeetCode month grouping
│   │   ├── globals.css            # Tailwind v4 theme tokens, scanlines & typography
│   │   ├── layout.tsx             # SEO metadata, OpenGraph, viewport, Lenis provider
│   │   └── page.tsx               # Main recruiter landing layout
│   ├── components/
│   │   ├── ContactSection.tsx     # Direct recruiter communication cockpit & contact form
│   │   ├── CustomCursor.tsx       # Smooth trailing cursor with hover states
│   │   ├── EducationCertSection.tsx # AKTU B.Tech IT & Udemy React/Next.js
│   │   ├── Footer.tsx             # Terminal-style status footer & back-to-top
│   │   ├── GitHubActivitySection.tsx # LeetCode-style GitHub contribution activity card
│   │   ├── HeroSection.tsx        # Asymmetric hero & 30-second summary card
│   │   ├── Icons.tsx              # Crisp inline SVG brand icons (GitHub, LinkedIn, LeetCode)
│   │   ├── InteractiveCanvas.tsx  # Dynamic interactive particle-mesh hero element
│   │   ├── Navbar.tsx             # Minimal sticky header with availability badge & ⌘K trigger
│   │   ├── ProjectShowcase.tsx    # SkillShare, EduMeet, Library System architecture panels
│   │   ├── QuickCommandPalette.tsx# Recruiter ⌘K quick action search modal
│   │   ├── SkillsSection.tsx      # Domain matrix with search filter (no percentage bars)
│   │   └── SmoothScrollProvider.tsx # Lenis smooth scroll integration
│   ├── data/
│   │   └── portfolioData.ts       # Central typed portfolio data store
│   ├── lib/
│   │   └── githubActivity.ts      # LeetCode month grouping & fallback activity generator
│   └── types/
│       └── portfolio.ts           # TypeScript interfaces for projects, activity, skills
├── .env.example                   # Template environment variables
├── .env.local                     # Local environment variables
└── README.md
```

---

## 🛠️ Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/Omkumar9506/portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```env
# GitHub Personal Access Token (classic with public read access or fine-grained)
# If omitted, realistic fallback activity data is served automatically.
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=Omkumar9506

# Resend API Key for /api/contact email delivery (https://resend.com)
# If omitted, contact submissions are safely simulated in dev/demo mode without errors.
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_RECEIVER_EMAIL=hari.9506563662@gmail.com
```

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🚢 Deploy to Vercel

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: recruiter-optimized developer portfolio with LeetCode-style activity heatmap"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
3. Import your portfolio repository.
4. In the **Environment Variables** section, add:
   - `GITHUB_TOKEN`: `your_github_token` (optional, for live GitHub activity)
   - `GITHUB_USERNAME`: `Omkumar9506`
   - `RESEND_API_KEY`: `re_your_resend_api_key_here` (optional, for live email delivery)
   - `CONTACT_RECEIVER_EMAIL`: `hari.9506563662@gmail.com`
5. Click **Deploy**. Vercel will automatically build and deploy your site.

---

## 🔒 Security & Privacy
- **Zero Exposed Secrets:** API keys and GitHub tokens are strictly confined to server-side Next.js route handlers (`src/app/api/github/[year]/route.ts` and `src/app/api/contact/route.ts`).
- **No Private Phone Number:** Phone number is deliberately omitted from public display to protect privacy while offering 1-click email, LinkedIn, and GitHub links. -->
