import { Badge, type BadgeTone } from "@/components/ui/badge";
import type { CustomerStatus } from "@/lib/data";

const map: Record<CustomerStatus, { label: string; tone: BadgeTone }> = {
  active: { label: "Active", tone: "success" },
  trialing: { label: "Trialing", tone: "brand" },
  past_due: { label: "Past due", tone: "warning" },
  churned: { label: "Churned", tone: "danger" },
};

export function StatusBadge({ status }: { status: CustomerStatus }) {
  const { label, tone } = map[status];
  return (
    <Badge tone={tone}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </Badge>
  );
}
