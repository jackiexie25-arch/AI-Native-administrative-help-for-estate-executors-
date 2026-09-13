"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartHandshake } from "lucide-react";
import { caseInfo } from "@/lib/data/executor";

export default function OnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    deceasedName: caseInfo.deceasedName,
    dateOfDeath: caseInfo.dateOfDeath,
    relationship: caseInfo.relationshipToExecutor,
    hasWill: caseInfo.hasWill ? "yes" : "no",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/executor/documents");
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-primary/10 text-warm-primary">
          <HeartHandshake className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-warm-text">
          Let&rsquo;s take this one step at a time.
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-warm-muted">
          We&rsquo;ll use a few details to work out which institutions need to be
          notified and what they&rsquo;ll ask for. Nothing here is shared with
          anyone.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-warm-border bg-warm-surface p-6 shadow-sm"
      >
        <div>
          <label className="text-sm font-medium text-warm-text">
            Full name of the person who passed away
          </label>
          <input
            type="text"
            value={form.deceasedName}
            onChange={(e) => setForm({ ...form, deceasedName: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-warm-border bg-white px-3.5 py-2.5 text-sm text-warm-text outline-none focus:border-warm-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-warm-text">Date of death</label>
          <input
            type="date"
            value={form.dateOfDeath}
            onChange={(e) => setForm({ ...form, dateOfDeath: e.target.value })}
            className="mt-1.5 w-full rounded-lg border border-warm-border bg-white px-3.5 py-2.5 text-sm text-warm-text outline-none focus:border-warm-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-warm-text">
            Your relationship to them
          </label>
          <input
            type="text"
            value={form.relationship}
            onChange={(e) => setForm({ ...form, relationship: e.target.value })}
            placeholder="e.g. Son, daughter, spouse, friend"
            className="mt-1.5 w-full rounded-lg border border-warm-border bg-white px-3.5 py-2.5 text-sm text-warm-text outline-none focus:border-warm-primary"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-warm-text">
            Do you know if they left a will?
          </p>
          <div className="mt-2 flex gap-2">
            {["yes", "no", "not sure"].map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setForm({ ...form, hasWill: opt })}
                className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
                  form.hasWill === opt
                    ? "border-warm-primary bg-warm-primary text-white"
                    : "border-warm-border bg-white text-warm-text hover:border-warm-primary/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <p className="rounded-lg bg-warm-surface-2 px-3.5 py-2.5 text-xs leading-relaxed text-warm-muted">
          Afterwards helps with the administrative side only — notifying
          institutions and tracking paperwork. It doesn&rsquo;t provide legal
          advice or help with the will itself.
        </p>

        <button
          type="submit"
          className="w-full rounded-lg bg-warm-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-warm-primary-dark"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
