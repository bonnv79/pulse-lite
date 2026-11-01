import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-brand text-brand-fg hover:opacity-90",
  secondary: "border bg-surface hover:bg-surface-2",
  ghost: "hover:bg-surface-2",
  danger: "bg-danger text-white hover:opacity-90",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-sm",
  icon: "size-9",
} as const;

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function buttonClass(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md") {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium transition disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
  );
}

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonClass(variant, size), className)} {...props} />;
}
