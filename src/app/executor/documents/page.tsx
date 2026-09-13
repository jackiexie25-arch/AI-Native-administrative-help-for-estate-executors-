"use client";

import { useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Check,
  Loader2,
} from "lucide-react";
import { extractedDocuments as initialDocs } from "@/lib/data/executor";
import { institutions } from "@/lib/data/institutions";
import { ExtractedDocument } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const mockIncomingFiles = [
  {
    fileName: "westpac_joint_account.pdf",
    documentType: "Bank statement",
    institutionId: "westpac",
    accountType: "Joint savings account",
    balanceStatus: "Approx. $6,200 — below probate threshold",
    maskedAccountNumber: "•••• 7734",
    confidence: 0.76,
  },
  {
    fileName: "telstra_final_notice.pdf",
    documentType: "Utility bill",
    institutionId: "telstra",
    accountType: "Mobile plan",
    balanceStatus: "Final balance $42.00 owing",
    maskedAccountNumber: "•••• 5510",
    confidence: 0.83,
  },
];

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const isHigh = confidence >= 0.85;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
        isHigh ? "bg-warm-good/10 text-warm-good" : "bg-warm-warn/10 text-warm-warn"
      }`}
    >
      {isHigh ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
      {pct}% confidence
    </span>
  );
}

function DocumentCard({
  doc,
  onUpdate,
  onConfirm,
}: {
  doc: ExtractedDocument;
  onUpdate: (id: string, patch: Partial<ExtractedDocument>) => void;
  onConfirm: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const inst = institutions.find((i) => i.id === doc.institutionId);

  return (
    <div className="rounded-2xl border border-warm-border bg-warm-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warm-surface-2 text-warm-primary">
            <FileText className="h-4.5 w-4.5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-medium text-warm-text">{doc.fileName}</p>
            <p className="text-xs text-warm-muted">
              Uploaded {doc.uploadedAt ? formatDate(doc.uploadedAt) : "just now"}
            </p>
          </div>
        </div>
        <ConfidenceBadge confidence={doc.confidence} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-warm-border pt-4 text-sm">
        <Field
          label="Document type"
          value={doc.documentType}
          editing={editing}
          onChange={(v) => onUpdate(doc.id, { documentType: v })}
        />
        <Field
          label="Institution"
          value={inst?.name ?? "Not matched"}
          editing={false}
        />
        <Field
          label="Account type"
          value={doc.accountType ?? "—"}
          editing={editing}
          onChange={(v) => onUpdate(doc.id, { accountType: v })}
        />
        <Field
          label="Masked account number"
          value={doc.maskedAccountNumber ?? "—"}
          editing={editing}
          onChange={(v) => onUpdate(doc.id, { maskedAccountNumber: v })}
        />
        <div className="col-span-2">
          <Field
            label="Balance / status"
            value={doc.balanceStatus ?? "—"}
            editing={editing}
            onChange={(v) => onUpdate(doc.id, { balanceStatus: v })}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-warm-border pt-4">
        <button
          onClick={() => setEditing((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-medium text-warm-muted hover:text-warm-primary"
        >
          <Pencil className="h-3.5 w-3.5" />
          {editing ? "Done editing" : "Edit details"}
        </button>
        {doc.status === "confirmed" ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-warm-good">
            <CheckCircle2 className="h-3.5 w-3.5" /> Confirmed
          </span>
        ) : (
          <button
            onClick={() => onConfirm(doc.id)}
            className="flex items-center gap-1.5 rounded-full bg-warm-primary px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-warm-primary-dark"
          >
            <Check className="h-3.5 w-3.5" /> Looks right, confirm
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  editing,
  onChange,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-wide text-warm-muted uppercase">
        {label}
      </p>
      {editing && onChange ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-warm-border bg-white px-2 py-1 text-sm text-warm-text outline-none focus:border-warm-primary"
        />
      ) : (
        <p className="mt-0.5 text-sm text-warm-text">{value}</p>
      )}
    </div>
  );
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<ExtractedDocument[]>(initialDocs);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadIndex, setUploadIndex] = useState(0);

  function handleUpdate(id: string, patch: Partial<ExtractedDocument>) {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }

  function handleConfirm(id: string) {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "confirmed" } : d))
    );
  }

  function handleUpload() {
    if (uploadIndex >= mockIncomingFiles.length || isProcessing) return;
    setIsProcessing(true);
    const incoming = mockIncomingFiles[uploadIndex];
    setTimeout(() => {
      setDocs((prev) => [
        ...prev,
        {
          id: `doc-upload-${Date.now()}`,
          ...incoming,
          status: "needs_review",
          uploadedAt: new Date().toISOString(),
        },
      ]);
      setUploadIndex((i) => i + 1);
      setIsProcessing(false);
    }, 1400);
  }

  const needsReview = docs.filter((d) => d.status === "needs_review");
  const confirmed = docs.filter((d) => d.status === "confirmed");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-warm-text">Documents</h1>
        <p className="mt-1 text-sm text-warm-muted">
          Upload bills, statements, wills or notices. We&rsquo;ll pull out the
          details for you to check — nothing is submitted anywhere until you
          confirm it.
        </p>
      </div>

      <button
        onClick={handleUpload}
        disabled={isProcessing || uploadIndex >= mockIncomingFiles.length}
        className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-warm-border bg-warm-surface-2/50 px-6 py-10 text-center transition-colors hover:border-warm-primary/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-7 w-7 animate-spin text-warm-primary" />
            <p className="text-sm font-medium text-warm-text">Reading your document…</p>
            <p className="text-xs text-warm-muted">This usually takes a few seconds.</p>
          </>
        ) : uploadIndex >= mockIncomingFiles.length ? (
          <>
            <CheckCircle2 className="h-7 w-7 text-warm-good" />
            <p className="text-sm font-medium text-warm-text">All sample documents uploaded</p>
            <p className="text-xs text-warm-muted">Review them below.</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-7 w-7 text-warm-primary" />
            <p className="text-sm font-medium text-warm-text">
              Click to simulate uploading a document
            </p>
            <p className="text-xs text-warm-muted">PDF, JPG or PNG — bills, statements, wills, notices</p>
          </>
        )}
      </button>

      {needsReview.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-base font-semibold text-warm-text">
            Needs your review
            <span className="rounded-full bg-warm-warn/10 px-2 py-0.5 text-xs font-medium text-warm-warn">
              {needsReview.length}
            </span>
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {needsReview.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onUpdate={handleUpdate}
                onConfirm={handleConfirm}
              />
            ))}
          </div>
        </section>
      )}

      {confirmed.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-warm-text">Confirmed</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {confirmed.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onUpdate={handleUpdate}
                onConfirm={handleConfirm}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
