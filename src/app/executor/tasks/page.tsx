"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { executorTasks as initialTasks } from "@/lib/data/executor";
import { getInstitution, categoryLabels } from "@/lib/data/institutions";
import { ExecutorTask, TaskStatus } from "@/lib/types";
import { formatDate, daysUntil } from "@/lib/utils";

const stages: { key: TaskStatus; label: string }[] = [
  { key: "not_started", label: "Not started" },
  { key: "gathering", label: "Gathering documents" },
  { key: "submitted", label: "Submitted" },
  { key: "confirmed", label: "Confirmed" },
];

function stageIndex(status: TaskStatus) {
  return stages.findIndex((s) => s.key === status);
}

function DeadlineNote({ deadline }: { deadline?: string }) {
  if (!deadline) return null;
  const days = daysUntil(deadline);
  const tone =
    days < 0 ? "text-warm-warn" : days <= 10 ? "text-warm-warn" : "text-warm-muted";
  return (
    <p className={`text-xs ${tone}`}>
      {days < 0
        ? `Was due ${formatDate(deadline)}`
        : `Due ${formatDate(deadline)} · ${days} days from now`}
    </p>
  );
}

function TaskCard({
  task,
  onAdvance,
}: {
  task: ExecutorTask;
  onAdvance: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const inst = getInstitution(task.institutionId);
  if (!inst) return null;
  const idx = stageIndex(task.status);

  return (
    <div className="rounded-2xl border border-warm-border bg-warm-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warm-surface-2 text-[10px] font-bold text-warm-primary">
            {inst.initial}
          </div>
          <div>
            <p className="text-sm font-semibold text-warm-text">{inst.name}</p>
            <p className="text-xs text-warm-muted">{categoryLabels[inst.category]}</p>
          </div>
        </div>
        <DeadlineNote deadline={task.deadline} />
      </div>

      {/* Stage stepper */}
      <div className="mt-4 flex items-center gap-1.5">
        {stages.slice(1).map((stage, i) => (
          <div key={stage.key} className="flex flex-1 items-center gap-1.5">
            <div
              className={`h-1.5 flex-1 rounded-full ${
                i < idx ? "bg-warm-primary" : "bg-warm-surface-2"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-xs font-medium text-warm-text">{stages[idx].label}</p>
        {idx < stages.length - 1 && (
          <button
            onClick={() => onAdvance(task.id)}
            className="text-xs font-medium text-warm-primary hover:underline"
          >
            Mark as {stages[idx + 1].label.toLowerCase()} →
          </button>
        )}
      </div>

      {task.notes && (
        <p className="mt-3 rounded-lg bg-warm-surface-2 px-3 py-2 text-xs text-warm-muted">
          {task.notes}
        </p>
      )}

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 flex w-full items-center justify-between border-t border-warm-border pt-3 text-left text-xs font-medium text-warm-muted hover:text-warm-primary"
      >
        <span className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5" /> What does {inst.name} need, in plain English?
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="mt-2 space-y-2 rounded-lg bg-warm-surface-2 px-3.5 py-3 text-xs leading-relaxed text-warm-text">
          <p>{inst.plainEnglish}</p>
          {inst.probateThreshold && (
            <p className="text-warm-muted">{inst.probateThreshold}</p>
          )}
          <div>
            <p className="font-medium text-warm-muted">Documents typically required:</p>
            <ul className="mt-1 list-inside list-disc space-y-0.5">
              {inst.documentsRequired.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<ExecutorTask[]>(initialTasks);

  function advance(id: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = stageIndex(t.status);
        const next = stages[Math.min(idx + 1, stages.length - 1)].key;
        return { ...t, status: next };
      })
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-warm-text">Tasks by institution</h1>
        <p className="mt-1 text-sm text-warm-muted">
          Every institution that needs to hear from you, and where things stand.
          Deadlines are shown so you can plan — none of these need to happen today.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onAdvance={advance} />
        ))}
      </div>
    </div>
  );
}
