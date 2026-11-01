"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthPoint } from "@/lib/data";
import { formatCurrency, formatCurrencyCompact } from "@/lib/utils";
import { ChartTooltip, axisProps } from "./chart-tooltip";

export function MrrChart({ data, height = 280 }: { data: MonthPoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} width={56} tickFormatter={formatCurrencyCompact} />
        <Tooltip content={<ChartTooltip format={formatCurrency} />} cursor={{ stroke: "var(--border)" }} />
        <Area type="monotone" dataKey="mrr" name="MRR" stroke="var(--chart-1)" strokeWidth={2} fill="url(#mrrFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
