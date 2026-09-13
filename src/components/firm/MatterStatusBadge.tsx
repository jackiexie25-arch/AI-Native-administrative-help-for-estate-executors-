import { MatterStatus } from "@/lib/types";

const config: Record<MatterStatus, { label: string; classes: string }> = {
  active: { label: "Active", classes: "bg-firm-accent-bg text-firm-accent" },
  awaiting_client: { label: "Awaiting client", classes: "bg-amber-50 text-firm-warn" },
  near_complete: { label: "Near complete", classes: "bg-blue-50 text-blue-700" },
  closed: { label: "Closed", classes: "bg-neutral-100 text-firm-muted" },
};

export function MatterStatusBadge({ status }: { status: MatterStatus }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${c.classes}`}>
      {c.label}
    </span>
  );
}
