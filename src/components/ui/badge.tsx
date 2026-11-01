import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-surface-2 text-muted",
  brand: "bg-brand-soft text-brand",
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/12 text-danger",
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({ tone = "neutral", className, ...props }: React.ComponentProps<"span"> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap", tones[tone], className)}
      {...props}
    />
  );
}
