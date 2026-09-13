import Link from "next/link";
import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";
import { executorTasks, nextSteps, caseInfo } from "@/lib/data/executor";
import { getInstitution } from "@/lib/data/institutions";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { TaskStatus } from "@/lib/types";
import { formatDate, daysUntil } from "@/lib/utils";

const statusWeight: Record<TaskStatus, number> = {
  not_started: 0,
  gathering: 0.33,
  submitted: 0.66,
  confirmed: 1,
};

const statusLabel: Record<TaskStatus, string> = {
  not_started: "Not started",
  gathering: "Gathering documents",
  submitted: "Submitted",
  confirmed: "Confirmed",
};

function StatusIcon({ status }: { status: TaskStatus }) {
  if (status === "confirmed")
    return <CheckCircle2 className="h-4 w-4 text-warm-good" strokeWidth={2} />;
  if (status === "submitted" || status === "gathering")
    return <Clock className="h-4 w-4 text-warm-warn" strokeWidth={2} />;
  return <Circle className="h-4 w-4 text-warm-muted/50" strokeWidth={2} />;
}

export default function ExecutorDashboard() {
  const overallProgress = Math.round(
    (executorTasks.reduce((sum, t) => sum + statusWeight[t.status], 0) /
      executorTasks.length) *
      100
  );
  const confirmedCount = executorTasks.filter((t) => t.status === "confirmed").length;

  return (
    <div className="space-y-8">
      {/* Emotional anchor: calm progress summary */}
      <section className="rounded-2xl border border-warm-border bg-warm-surface p-7 shadow-sm">
        <p className="text-sm text-warm-muted">
          {formatDate(caseInfo.dateOfDeath)} · {caseInfo.relationshipToExecutor}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-warm-text">
          You&rsquo;re {overallProgress}% of the way through.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-warm-muted">
          {confirmedCount} of {executorTasks.length} institutions are fully confirmed.
          Take this at your own pace — nothing here is urgent enough to rush.
        </p>
        <div className="mt-5">
          <ProgressBar
            value={overallProgress}
            colorClass="bg-warm-primary"
            trackClass="bg-warm-surface-2"
            height="h-2.5"
          />
        </div>
      </section>

      {/* What to do next — deliberately short */}
      <section>
        <h2 className="text-base font-semibold text-warm-text">What to do next</h2>
        <div className="mt-3 space-y-2.5">
          {nextSteps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-warm-border bg-warm-surface px-4 py-3.5"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warm-primary/10 text-xs font-semibold text-warm-primary">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-warm-text">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Institution status overview */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-warm-text">Institution status</h2>
          <Link
            href="/executor/tasks"
            className="flex items-center gap-1 text-sm font-medium text-warm-primary hover:underline"
          >
            View all tasks <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {executorTasks.map((task) => {
            const inst = getInstitution(task.institutionId);
            if (!inst) return null;
            const days = task.deadline ? daysUntil(task.deadline) : null;
            return (
              <div
                key={task.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-warm-border bg-warm-surface px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warm-surface-2 text-[10px] font-bold text-warm-primary">
                    {inst.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-warm-text">{inst.name}</p>
                    <p className="text-xs text-warm-muted">{statusLabel[task.status]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {days !== null && task.status !== "confirmed" && (
                    <span className="text-xs text-warm-muted">
                      {days >= 0 ? `${days}d left` : "past due"}
                    </span>
                  )}
                  <StatusIcon status={task.status} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
