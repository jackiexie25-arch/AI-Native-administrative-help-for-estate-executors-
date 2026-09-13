import { ClaimStatus } from "@/lib/types";

const config: Record<ClaimStatus, { label: string; classes: string }> = {
  gathering_documents: {
    label: "Gathering documents",
    classes: "bg-ent-border text-ent-muted",
  },
  in_review: {
    label: "In review",
    classes: "bg-ent-accent/10 text-ent-accent",
  },
  pending_decision: {
    label: "Pending decision",
    classes: "bg-ent-warn-bg text-ent-warn",
  },
  approaching_deadline: {
    label: "Approaching deadline",
    classes: "bg-ent-danger-bg text-ent-danger",
  },
  completed: {
    label: "Completed",
    classes: "bg-ent-good-bg text-ent-good",
  },
};

export function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${c.classes}`}
    >
      {c.label}
    </span>
  );
}
