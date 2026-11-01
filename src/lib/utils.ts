export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const num = new Intl.NumberFormat("en-US");
const numCompact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export const formatCurrency = (v: number) => usd.format(v);
export const formatCurrencyCompact = (v: number) => usdCompact.format(v);
export const formatNumber = (v: number) => num.format(v);
export const formatNumberCompact = (v: number) => numCompact.format(v);
export const formatPercent = (v: number, digits = 1) => `${v >= 0 ? "+" : ""}${v.toFixed(digits)}%`;

/** Formats an ISO date (YYYY-MM-DD) without depending on the runtime time zone. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
}
