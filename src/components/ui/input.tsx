import { cn } from "@/lib/utils";

export const fieldClass =
  "h-9 w-full rounded-lg border bg-surface px-3 text-sm placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn(fieldClass, "pr-8", className)} {...props} />;
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("mb-1.5 block text-sm font-medium", className)} {...props} />;
}
