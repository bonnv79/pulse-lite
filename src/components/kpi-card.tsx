import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  kind,
  change,
  invert = false,
}: {
  label: string;
  value: number;
  kind: "currency" | "number" | "percent";
  change: number;
  invert?: boolean;
}) {
  const display = kind === "currency" ? formatCurrency(value) : kind === "percent" ? `${value.toFixed(2)}%` : formatNumber(value);
  const good = invert ? change <= 0 : change >= 0;
  const Arrow = change >= 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <Card className="p-4 sm:p-5">
      <p className="text-xs text-muted sm:text-sm">{label}</p>
      <p className="mt-2 text-xl font-semibold sm:text-2xl tracking-tight tabular-nums">{display}</p>
      <p className={cn("mt-2 inline-flex items-center gap-1 text-xs font-medium", good ? "text-success" : "text-danger")}>
        <Arrow className="size-3.5" aria-hidden />
        {kind === "percent" ? `${formatPercent(change, 2)} pts` : formatPercent(change)}
        <span className="hidden font-normal text-muted sm:inline">vs last month</span>
      </p>
    </Card>
  );
}
