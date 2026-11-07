import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "h-9 w-full rounded-lg border bg-surface px-3 text-sm placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

/** Native select with a custom chevron, so the arrow has the same padding in every browser. */
export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div className={cn("relative w-full", className)}>
      <select className={cn(fieldClass, "cursor-pointer appearance-none pr-9")} {...props} />
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
    </div>
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("mb-1.5 block text-sm font-medium", className)} {...props} />;
}
