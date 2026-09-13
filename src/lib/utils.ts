export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// "Today" is fixed for this demo so deadline math stays stable across runs.
export const DEMO_TODAY = new Date("2026-09-13T00:00:00+10:00");

export function daysUntil(iso: string): number {
  const target = new Date(iso + "T00:00:00+10:00");
  const diffMs = target.getTime() - DEMO_TODAY.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function deadlineTone(iso: string): "ok" | "soon" | "overdue" {
  const days = daysUntil(iso);
  if (days < 0) return "overdue";
  if (days <= 14) return "soon";
  return "ok";
}
