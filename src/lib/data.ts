/**
 * Mock data for the demo. Everything is generated from a fixed seed so the
 * server and the browser always render the same numbers.
 * Replace these functions with real API calls in your project.
 */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type Plan = "Starter" | "Growth" | "Scale";
export type CustomerStatus = "active" | "trialing" | "past_due" | "churned";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: Plan;
  status: CustomerStatus;
  mrr: number;
  seats: number;
  country: string;
  joined: string; // YYYY-MM-DD
}

export interface MonthPoint {
  month: string;
  mrr: number;
  newMrr: number;
  churnedMrr: number;
  expansionMrr: number;
  customers: number;
}

export interface DayPoint {
  day: string;
  visitors: number;
  signups: number;
}

export function getMonthlySeries(): MonthPoint[] {
  const rand = mulberry32(42);
  let mrr = 38_000;
  let customers = 410;
  return MONTHS.map((month) => {
    const newMrr = Math.round(4_000 + rand() * 3_500);
    const churnedMrr = Math.round(900 + rand() * 1_400);
    const expansionMrr = Math.round(600 + rand() * 1_200);
    mrr += newMrr - churnedMrr + expansionMrr;
    customers += Math.round(18 + rand() * 22);
    return { month, mrr, newMrr, churnedMrr, expansionMrr, customers };
  });
}

export function getDailyTraffic(days = 30): DayPoint[] {
  const rand = mulberry32(7);
  return Array.from({ length: days }, (_, i) => {
    const weekday = i % 7;
    const base = weekday === 5 || weekday === 6 ? 1_600 : 2_400;
    const visitors = Math.round(base + rand() * 900 + i * 18);
    return { day: `D${i + 1}`, visitors, signups: Math.round(visitors * (0.025 + rand() * 0.02)) };
  });
}

export function getTrafficSources() {
  return [
    { name: "Organic search", value: 42 },
    { name: "Direct", value: 24 },
    { name: "Referral", value: 19 },
    { name: "Social", value: 15 },
  ];
}

export function getPlanBreakdown() {
  const series = getMonthlySeries();
  const { mrr, customers } = series[series.length - 1];
  const split: Array<[Plan, number, number]> = [
    ["Starter", 0.15, 0.56], // [plan, share of MRR, share of customers]
    ["Growth", 0.36, 0.33],
    ["Scale", 0.49, 0.11],
  ];
  return split.map(([plan, m, c]) => ({ plan, mrr: Math.round(mrr * m), customers: Math.round(customers * c) }));
}

const FIRST = ["Ava", "Liam", "Mia", "Noah", "Zoe", "Ethan", "Lena", "Omar", "Iris", "Kai", "Nora", "Leo", "Maya", "Finn", "Sara", "Ivan", "Lucy", "Theo", "Ruby", "Hugo"];
const LAST = ["Nguyen", "Patel", "Kim", "Garcia", "Muller", "Silva", "Tanaka", "Rossi", "Novak", "Haddad", "Okafor", "Larsen", "Costa", "Ivanova", "Reyes"];
const COMPANY_A = ["North", "Bright", "Blue", "Quiet", "Swift", "Paper", "Iron", "Lumen", "Cedar", "Orbit", "Maple", "Signal"];
const COMPANY_B = ["Labs", "Works", "Studio", "Systems", "Cloud", "Analytics", "Supply", "Health", "Logistics", "Media"];
const COUNTRIES = ["US", "VN", "DE", "GB", "JP", "BR", "IN", "FR", "CA", "AU"];
const PLAN_PRICE: Record<Plan, number> = { Starter: 29, Growth: 120, Scale: 500 };

let cachedCustomers: Customer[] | null = null;

export function getCustomers(): Customer[] {
  if (cachedCustomers) return cachedCustomers;
  const rand = mulberry32(2026);
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)];
  cachedCustomers = Array.from({ length: 64 }, (_, i) => {
    const first = pick(FIRST);
    const last = pick(LAST);
    const company = `${pick(COMPANY_A)} ${pick(COMPANY_B)}`;
    const r = rand();
    const plan: Plan = r < 0.5 ? "Starter" : r < 0.85 ? "Growth" : "Scale";
    const s = rand();
    const status: CustomerStatus = s < 0.72 ? "active" : s < 0.84 ? "trialing" : s < 0.93 ? "past_due" : "churned";
    const seats = plan === "Starter" ? 1 + Math.floor(rand() * 3) : plan === "Growth" ? 3 + Math.floor(rand() * 12) : 15 + Math.floor(rand() * 60);
    const month = 1 + Math.floor(rand() * 10);
    const day = 1 + Math.floor(rand() * 28);
    return {
      id: `cus_${(1000 + i).toString(36)}${Math.floor(rand() * 1e6).toString(36)}`,
      name: `${first} ${last}`,
      email: `${first}.${last}@${company.replace(" ", "").toLowerCase()}.example`.toLowerCase(),
      company,
      plan,
      status,
      mrr: status === "churned" || status === "trialing" ? 0 : PLAN_PRICE[plan] * (plan === "Starter" ? 1 : Math.ceil(seats / 5)),
      seats,
      country: pick(COUNTRIES),
      joined: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    };
  });
  return cachedCustomers;
}

export function getRecentActivity() {
  return [
    { id: 1, who: "Bright Labs", what: "upgraded to Scale", when: "12 min ago", type: "upgrade" as const },
    { id: 2, who: "Orbit Media", what: "started a trial", when: "48 min ago", type: "trial" as const },
    { id: 3, who: "Cedar Health", what: "payment failed", when: "2 h ago", type: "failed" as const },
    { id: 4, who: "Swift Supply", what: "added 6 seats", when: "5 h ago", type: "upgrade" as const },
    { id: 5, who: "Paper Studio", what: "cancelled Starter", when: "Yesterday", type: "churn" as const },
  ];
}

export function getKpis() {
  const series = getMonthlySeries();
  const last = series[series.length - 1];
  const prev = series[series.length - 2];
  const change = (a: number, b: number) => ((a - b) / b) * 100;
  const churnRate = (last.churnedMrr / prev.mrr) * 100;
  const prevChurn = (prev.churnedMrr / series[series.length - 3].mrr) * 100;
  return [
    { label: "Monthly recurring revenue", value: last.mrr, kind: "currency" as const, change: change(last.mrr, prev.mrr) },
    { label: "Active customers", value: last.customers, kind: "number" as const, change: change(last.customers, prev.customers) },
    { label: "Net new MRR", value: last.newMrr + last.expansionMrr - last.churnedMrr, kind: "currency" as const, change: change(last.newMrr + last.expansionMrr - last.churnedMrr, prev.newMrr + prev.expansionMrr - prev.churnedMrr) },
    { label: "Revenue churn", value: churnRate, kind: "percent" as const, change: churnRate - prevChurn, invert: true },
  ];
}
