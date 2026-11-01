"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltip } from "./chart-tooltip";

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

export function DonutChart({ data, unit = "%" }: { data: { name: string; value: number }[]; unit?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row lg:flex-col xl:flex-row">
      <div className="h-40 w-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltip format={(v) => `${v}${unit}`} />} />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="100%" paddingAngle={2} stroke="none">
              {data.map((d, i) => (
                <Cell key={d.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="w-full space-y-2 text-sm">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="text-muted">{d.name}</span>
            <span className="ml-auto font-medium tabular-nums">
              {d.value}
              {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
