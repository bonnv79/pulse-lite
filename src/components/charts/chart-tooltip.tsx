"use client";

type Item = { name?: string | number; value?: number | string; color?: string; dataKey?: string | number };

export function ChartTooltip({
  active,
  payload,
  label,
  format = (v) => String(v),
}: {
  active?: boolean;
  payload?: readonly Item[];
  label?: string | number;
  format?: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-surface px-3 py-2 text-xs shadow-lg">
      {label !== undefined && <div className="mb-1 font-medium">{label}</div>}
      <ul className="space-y-0.5">
        {payload.map((p) => (
          <li key={String(p.dataKey ?? p.name)} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted">{p.name}</span>
            <span className="ml-auto pl-3 font-medium tabular-nums">{format(Number(p.value))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const axisProps = {
  stroke: "var(--muted)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;
