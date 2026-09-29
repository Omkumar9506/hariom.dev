export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  weekday: number; // 0 = Sun, 6 = Sat
}

export interface ContributionWeek {
  days: (ContributionDay | null)[];
}

export interface MonthBlock {
  name: string;
  year: number;
  monthIndex: number;
  weeks: ContributionWeek[];
}

export interface GitHubActivityData {
  year: string;
  publicRepos: number;
  totalContributions: number;
  totalActiveDays: number;
  maxStreak: number;
  months: MonthBlock[];
  isLive: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  stack: string[];
  problem: string;
  solution: string;
  architecture: string;
  keyFeatures: string[];
  metrics: ProjectMetric[];
  githubUrl: string;
  liveUrl: string;
  statusBadge: string;
  terminalCodeSnippet?: string;
}

export interface SkillItem {
  name: string;
  badge?: string;
  highlight?: boolean;
}

export interface SkillGroup {
  category: string;
  categoryCode: string;
  skills: SkillItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  description: string;
  skills: string[];
}
