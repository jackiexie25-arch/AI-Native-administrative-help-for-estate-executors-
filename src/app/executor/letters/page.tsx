"use client";

import { useState } from "react";
import { Copy, Check, Download, Mail } from "lucide-react";
import { institutions } from "@/lib/data/institutions";
import { caseInfo } from "@/lib/data/executor";
import { formatDate } from "@/lib/utils";

// Only institutions not auto-notified by the government's Death Notification
// Service need a generated letter — the others are already covered.
const eligibleInstitutions = institutions.filter((i) => !i.notifiedByDNS);

function buildLetter(institutionId: string) {
  const inst = eligibleInstitutions.find((i) => i.id === institutionId);
  if (!inst) return "";
  return `${formatDate(new Date().toISOString())}

To the Deceased Estates Team at ${inst.name},

I am writing to notify you of the death of ${caseInfo.deceasedName} on ${formatDate(
    caseInfo.dateOfDeath
  )}. I am ${caseInfo.executorName}, the ${caseInfo.hasWill ? "executor named in their will" : "administrator of their estate"}.

I would be grateful if you could place the appropriate hold on any accounts held with ${inst.name} and advise what documentation you require to proceed. I understand this typically includes:

${inst.documentsRequired.map((d) => `  • ${d}`).join("\n")}

Please let me know if any further information is required. I can be contacted at the details on file.

Yours sincerely,
${caseInfo.executorName}
Executor of the estate of ${caseInfo.deceasedName}`;
}

export default function LettersPage() {
  const [selected, setSelected] = useState(eligibleInstitutions[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const letter = buildLetter(selected);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can fail in some sandboxed contexts — fine to no-op for this demo.
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-warm-text">Notification letters</h1>
        <p className="mt-1 text-sm text-warm-muted">
          For institutions the government&rsquo;s Death Notification Service
          doesn&rsquo;t reach, here&rsquo;s a pre-filled letter you can send or
          take into a branch.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {eligibleInstitutions.map((inst) => (
          <button
            key={inst.id}
            onClick={() => setSelected(inst.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              selected === inst.id
                ? "border-warm-primary bg-warm-primary text-white"
                : "border-warm-border bg-warm-surface text-warm-text hover:border-warm-primary/50"
            }`}
          >
            {inst.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-warm-border bg-warm-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-warm-border px-5 py-3.5">
          <div className="flex items-center gap-2 text-sm font-medium text-warm-text">
            <Mail className="h-4 w-4 text-warm-primary" />
            Letter preview
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-full border border-warm-border px-3 py-1.5 text-xs font-medium text-warm-text hover:border-warm-primary/50"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-warm-good" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy text"}
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-warm-primary px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-warm-primary-dark">
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          </div>
        </div>
        <pre className="whitespace-pre-wrap px-6 py-6 font-sans text-sm leading-relaxed text-warm-text">
          {letter}
        </pre>
      </div>

      <p className="rounded-lg bg-warm-surface-2 px-3.5 py-2.5 text-xs leading-relaxed text-warm-muted">
        This letter states facts and requests information only — it makes no
        claims about entitlements or account ownership. Review it before
        sending, and adjust anything that doesn&rsquo;t match your situation.
      </p>
    </div>
  );
}
