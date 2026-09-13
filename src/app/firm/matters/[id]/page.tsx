import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  ClipboardList,
  AlertCircle,
  FileEdit,
  Send,
} from "lucide-react";
import { getMatter, matters } from "@/lib/data/firm";
import { MatterStatusBadge } from "@/components/firm/MatterStatusBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return matters.map((m) => ({ id: m.id }));
}

export default async function MatterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const matter = getMatter(id);
  if (!matter) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/firm"
        className="flex items-center gap-1.5 text-xs font-medium text-firm-muted hover:text-firm-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to matter list
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-firm-border bg-firm-surface p-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-firm-text">{matter.estateName}</h1>
            <MatterStatusBadge status={matter.status} />
          </div>
          <p className="mt-1 text-sm text-firm-muted">
            Executor client: {matter.executorClient} · Opened{" "}
            {formatDate(matter.dateOpened)} · {matter.assignedSolicitor}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-firm-accent-bg px-4 py-2.5">
          <Clock3 className="h-4 w-4 text-firm-accent" />
          <div>
            <p className="text-[11px] font-medium tracking-wide text-firm-accent uppercase">
              Time saved on this matter
            </p>
            <p className="text-sm font-semibold text-firm-text">
              {matter.estimatedHoursSavedThisMatter}h
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-firm-border bg-firm-surface p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-firm-text">Document extraction</p>
            <span className="text-sm font-semibold text-firm-text">
              {matter.extractionCompleteness}%
            </span>
          </div>
          <div className="mt-2.5">
            <ProgressBar
              value={matter.extractionCompleteness}
              colorClass="bg-firm-accent"
              trackClass="bg-firm-border"
              height="h-2"
            />
          </div>
        </div>
        <div className="rounded-xl border border-firm-border bg-firm-surface p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-firm-text">Task completeness</p>
            <span className="text-sm font-semibold text-firm-text">
              {matter.taskCompleteness}%
            </span>
          </div>
          <div className="mt-2.5">
            <ProgressBar
              value={matter.taskCompleteness}
              colorClass="bg-firm-primary"
              trackClass="bg-firm-border"
              height="h-2"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Outstanding from client */}
        <div className="rounded-xl border border-firm-border bg-firm-surface p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-firm-text">
            <AlertCircle className="h-4 w-4 text-firm-warn" />
            Still needed from client
          </h2>
          {matter.outstandingFromClient.length === 0 ? (
            <p className="mt-3 text-sm text-firm-accent">
              Nothing outstanding — all client-provided documents received.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {matter.outstandingFromClient.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-firm-text"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-firm-warn" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Extracted so far */}
        <div className="rounded-xl border border-firm-border bg-firm-surface p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-firm-text">
            <ClipboardList className="h-4 w-4 text-firm-accent" />
            Extracted from client documents
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-firm-text">
            <li className="flex justify-between border-b border-firm-border pb-2">
              <span className="text-firm-muted">Institutions identified</span>
              <span className="font-medium">5</span>
            </li>
            <li className="flex justify-between border-b border-firm-border pb-2">
              <span className="text-firm-muted">Documents processed</span>
              <span className="font-medium">7</span>
            </li>
            <li className="flex justify-between">
              <span className="text-firm-muted">Flagged for manual review</span>
              <span className="font-medium">2</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Plain-English drafting aid */}
      <div className="rounded-xl border border-firm-border bg-firm-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-firm-text">
            <FileEdit className="h-4 w-4 text-firm-accent" />
            Plain-English summary — drafting aid
          </h2>
          <button className="flex items-center gap-1.5 rounded-lg bg-firm-primary px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-neutral-700">
            <Send className="h-3.5 w-3.5" />
            Insert into client email
          </button>
        </div>
        <div className="mt-3 rounded-lg border border-dashed border-firm-border bg-firm-bg p-4 text-sm leading-relaxed text-firm-text">
          {matter.plainEnglishSummaryDraft}
        </div>
        <p className="mt-3 rounded-lg bg-amber-50 px-3.5 py-2.5 text-xs leading-relaxed text-firm-text">
          <span className="font-medium">Internal drafting aid only.</span> This
          summary is generated from extracted document data and is not
          client-facing legal advice. Review and edit before sending — the
          solicitor remains responsible for anything communicated to the
          client.
        </p>
      </div>
    </div>
  );
}
