"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DayPoint } from "@/lib/data";
import { formatNumber, formatNumberCompact } from "@/lib/utils";
import { ChartTooltip, axisProps } from "./chart-tooltip";

export function TrafficChart({ data, height = 240 }: { data: DayPoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
        <XAxis dataKey="day" {...axisProps} interval={4} />
        <YAxis yAxisId="v" {...axisProps} width={44} tickFormatter={formatNumberCompact} />
        <YAxis yAxisId="s" orientation="right" {...axisProps} width={36} />
        <Tooltip content={<ChartTooltip format={formatNumber} />} cursor={{ stroke: "var(--border)" }} />
        <Line yAxisId="v" type="monotone" dataKey="visitors" name="Visitors" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
        <Line yAxisId="s" type="monotone" dataKey="signups" name="Sign-ups" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
