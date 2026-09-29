import { ProjectData, SkillGroup, EducationItem, CertificationItem } from "@/types/portfolio";

export const PERSONAL_INFO = {
  name: "Hariom Kumar Gupta",
  role: "Full-Stack Developer (MERN, Next.js, NestJS)",
  subRole: "Open to SDE & Full-Stack Engineer Roles",
  location: "Lucknow, Uttar Pradesh, India",
  email: "hari.9506563662@gmail.com",
  github: "https://github.com/Omkumar9506",
  githubUsername: "Omkumar9506",
  linkedin: "https://linkedin.com/in/omkumar9506",
  leetcode: "https://leetcode.com/omkumar95065",
  resumePath: "/resume.pdf",
  summary:
    "Full-Stack Developer who builds real-time and payment-integrated products. Built a WebRTC video learning platform and a Razorpay + RBAC learning platform on PostgreSQL. Strong in REST API design, JWT auth, and database schema modeling. Solved 320+ LeetCode problems in Java.",
  leetcodeSolved: "320+",
  leetcodeFocus: "Arrays, Linked Lists, Trees, Binary Search, Two-Pointer, Sliding Window (Java)",
  availability: "AVAILABLE FOR SDE / FULL-STACK ROLES",
  targetGraduation: "Expected 2027",
};

export const PROJECTS: ProjectData[] = [
  {
    id: "skillshare",
    title: "SkillShare: Full Stack Learning Platform",
    subtitle: "Enterprise-grade multi-role LMS with Razorpay payment processing & automated PDF certificate generation",
    category: "Full-Stack Platform / Fintech & EdTech",
    stack: ["Next.js (App Router)", "NestJS", "PostgreSQL", "TypeORM", "Razorpay", "Cloudinary", "JWT", "Tailwind CSS"],
    statusBadge: "PRODUCTION ARCHITECTURE",
    problem:
      "Modern multi-instructor academies suffer from fragmented course workflows, payment reconciliation issues, and manual, error-prone certification pipelines that delay student onboarding.",
    solution:
      "Engineered a modular multi-tier platform with three strictly segregated RBAC portals (Student, Instructor, Admin). Integrated automated Razorpay webhook processing with cryptographic verification, real-time video progress tracking, and on-demand dynamic PDF certificate generation upon course completion.",
    architecture:
      "NestJS modular backend with TypeORM managing 6 indexed relational entities. Stateless JWT authentication with role-based guards, Cloudinary direct upload pipeline for course assets, and transactional database queries ensuring payment idempotency.",
    keyFeatures: [
      "Role-Based Access Control (RBAC) across Student, Instructor, and Admin dashboards with NestJS guards",
      "End-to-end course management: curricula nesting, video progression checkpoints, and interactive quizzes",
      "Razorpay payment gateway integration with cryptographic webhook validation and automated receipting",
      "Automated server-side vector PDF certificate generation with unique verification hashes",
      "Optimized PostgreSQL schema with 6 relational entities and sub-50ms query response times",
      "25+ documented RESTful APIs with automated request validation and centralized exception filters"
    ],
    metrics: [
      { label: "REST Endpoints", value: "25+" },
      { label: "Relational Entities", value: "6 Models" },
      { label: "Payment Safety", value: "100% Idempotent" },
      { label: "Cert Delivery", value: "Automated Instant" }
    ],
    githubUrl: "https://github.com/Omkumar9506/skillshare-platform",
    liveUrl: "https://skillshare-preview.vercel.app",
    terminalCodeSnippet: `// NestJS RBAC Guard + Razorpay Webhook Verifier
@Post('webhook')
@UseGuards(RazorpaySignatureGuard)
async handlePaymentWebhook(@Body() payload: RazorpayEvent) {
  const { orderId, paymentId } = payload.payload.payment.entity;
  return await this.enrollmentService.fulfillOrderWithCertificate(orderId, paymentId);
}`
  },
  {
    id: "edumeet",
    title: "EduMeet: Live Video and Chat Learning Platform",
    subtitle: "Sub-second WebRTC peer-to-peer video classrooms with synchronized Socket.io duplex messaging",
    category: "Real-Time Distributed System",
    stack: ["React.js", "Node.js", "Express.js", "WebRTC", "Socket.io", "MongoDB", "JWT", "Tailwind CSS"],
    statusBadge: "REAL-TIME / 50+ CONCURRENT",
    problem:
      "Standard meeting tools either introduce prohibitive licensing costs for classrooms or suffer high latency, unreliable connection recovery, and lack granular host controls during live lectures.",
    solution:
      "Developed a lightweight, high-performance real-time video lecture platform utilizing mesh WebRTC topology and Socket.io signaling. Built low-latency multi-peer audio/video streaming alongside a synchronized sub-second chat stream.",
    architecture:
      "Node.js/Express signaling server orchestrating SDP offers, answers, and ICE candidate exchanges. MongoDB stores room lifetimes and session audit logs. Custom Express middleware enforces Host vs. Student permissions (mute, screen-share lock, room kick).",
    keyFeatures: [
      "WebRTC video/audio streaming tested with 50+ concurrent classroom sessions",
      "Sub-second duplex chat latency powered by Socket.io room multiplexing",
      "Express RBAC middleware for host privileges (participant management, room locks, permissions)",
      "Automated ICE candidate re-negotiation and seamless reconnection handling on packet drops",
      "10+ REST APIs for user authentication, classroom scheduling, and meeting persistence"
    ],
    metrics: [
      { label: "Concurrent Peers", value: "50+ Users" },
      { label: "Chat Latency", value: "< 250ms" },
      { label: "REST Endpoints", value: "10+ APIs" },
      { label: "Media Signaling", value: "Full-Duplex" }
    ],
    githubUrl: "https://github.com/Omkumar9506/edumeet-webrtc",
    liveUrl: "https://edumeet-live.vercel.app",
    terminalCodeSnippet: `// WebRTC Mesh Signaling Engine
socket.on('join-room', (roomId, userId) => {
  socket.join(roomId);
  socket.to(roomId).emit('user-connected', userId);
  socket.on('disconnect', () => {
    socket.to(roomId).emit('user-disconnected', userId);
  });
});`
  },
  {
    id: "library-management",
    title: "Library Management System",
    subtitle: "Automated institutional circulation engine with automated overdue fine calculation and role authorization",
    category: "MERN Stack Enterprise System",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Bcrypt.js", "Axios"],
    statusBadge: "70% OVERHEAD REDUCTION",
    problem:
      "Manual book registers and fragmented spreadsheet checkouts cause high administrative errors, uncollected overdue fines, and missing inventory tracking in campus libraries.",
    solution:
      "Engineered an automated circulation portal with role-based dashboards for librarians and students. Designed a deterministic fine calculation engine that automatically penalizes delayed returns and restricts borrowing permissions.",
    architecture:
      "MERN stack architecture with Bcrypt salted credential hashing (salt rounds 10) and JWT bearer tokens. Normalized MongoDB schemas for books, users, and circulation transactions with atomic updates.",
    keyFeatures: [
      "Automated fine calculation and issue/return ledger cutting manual tracking effort by 70%",
      "Dual authorization tiers (Admin/Librarian vs Student) with protected route guards",
      "Instant catalog search with ISBN, author, category, and real-time availability filters",
      "Audit logging for all circulation events and member status histories",
      "5+ REST APIs handling inventory updates, student accounts, and return transactions"
    ],
    metrics: [
      { label: "Manual Effort Cut", value: "70%" },
      { label: "Security", value: "Bcrypt + JWT" },
      { label: "REST Endpoints", value: "5+ APIs" },
      { label: "Query Speed", value: "Sub-40ms" }
    ],
    githubUrl: "https://github.com/Omkumar9506/library-management-system",
    liveUrl: "https://library-system-demo.vercel.app",
    terminalCodeSnippet: `// Automated Overdue Fine Calculation Engine
const calculateFine = (dueDate, returnDate, dailyRate = 5) => {
  const overdueDays = Math.max(0, Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24)));
  return overdueDays * dailyRate;
};`
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    categoryCode: "LANG",
    skills: [
      { name: "Java", badge: "320+ LeetCode", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "C++" },
      { name: "Python" }
    ]
  },
  {
    category: "Frontend",
    categoryCode: "UI_UX",
    skills: [
      { name: "Next.js (App Router)", highlight: true },
      { name: "React.js", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "Redux Toolkit" },
      { name: "Context API" },
      { name: "Bootstrap" }
    ]
  },
  {
    category: "Backend & Systems",
    categoryCode: "SRV",
    skills: [
      { name: "NestJS", highlight: true },
      { name: "Node.js", highlight: true },
      { name: "Express.js", highlight: true },
      { name: "WebRTC", badge: "Real-Time P2P", highlight: true },
      { name: "Socket.io / WebSockets", highlight: true },
      { name: "REST APIs", highlight: true },
      { name: "Spring Boot" }
    ]
  },
  {
    category: "Auth & Security",
    categoryCode: "SEC",
    skills: [
      { name: "Role-Based Access Control (RBAC)", highlight: true },
      { name: "JWT (JSON Web Tokens)", highlight: true },
      { name: "Bcrypt Hashing", highlight: true },
      { name: "Stateless Session Guards" }
    ]
  },
  {
    category: "Databases & ORM",
    categoryCode: "DATA",
    skills: [
      { name: "PostgreSQL", highlight: true },
      { name: "MongoDB & Mongoose", highlight: true },
      { name: "TypeORM", highlight: true },
      { name: "MySQL" },
      { name: "Schema Modeling & Indexing", highlight: true }
    ]
  },
  {
    category: "Tools & Integrations",
    categoryCode: "DEVOPS",
    skills: [
      { name: "Razorpay (Payments & Webhooks)", highlight: true },
      { name: "Cloudinary (Media CDN)", highlight: true },
      { name: "Git & GitHub", highlight: true },
      { name: "Postman & Hoppscotch" },
      { name: "Vite" },
      { name: "Webpack" }
    ]
  },
  {
    category: "Core Computer Science",
    categoryCode: "CS_CORE",
    skills: [
      { name: "Data Structures & Algorithms (DSA)", badge: "320+ Java Solved", highlight: true },
      { name: "Database Management Systems (DBMS)", highlight: true },
      { name: "Operating Systems (OS)" },
      { name: "System Design Fundamentals", highlight: true }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Bachelor of Technology (B.Tech) in Information Technology",
    institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    location: "Lucknow, Uttar Pradesh, India",
    period: "2023 – Expected 2027",
    score: "72.56% Aggregate",
    description:
      "Core coursework focused on Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, and Operating Systems.",
    highlights: [
      "Maintained consistent academic aggregate of 72.56%",
      "Active competitive programmer with 320+ DSA solutions in Java",
      "Architected production-ready campus and peer learning systems"
    ]
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: "Complete React and Next.js Developer Course",
    issuer: "Udemy",
    year: "2025",
    description:
      "Comprehensive certification covering modern React 18/19 ecosystem, Next.js App Router, React Server Components, server actions, SSR/SSG caching paradigms, and production deployment patterns.",
    skills: ["React.js", "Next.js App Router", "Server Components", "State Architecture", "Vercel Deployment"]
  }
];

export const RECRUITER_HIGHLIGHTS = [
  {
    stat: "320+",
    label: "LeetCode DSA Problems",
    sub: "Java (Arrays, Trees, Binary Search, Sliding Window)"
  },
  {
    stat: "50+",
    label: "Concurrent WebRTC Peers",
    sub: "Sub-second duplex real-time communications"
  },
  {
    stat: "25+",
    label: "REST APIs in Single Project",
    sub: "NestJS + PostgreSQL + TypeORM + Razorpay RBAC"
  },
  {
    stat: "0%",
    label: "Template / Generic Fluff",
    sub: "Engineered from scratch for recruiters with zero BS"
  }
];
