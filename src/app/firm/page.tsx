import Link from "next/link";
import { Clock3, Briefcase, ArrowRight, AlertCircle } from "lucide-react";
import { matters, firmTimeSavedSummary } from "@/lib/data/firm";
import { MatterStatusBadge } from "@/components/firm/MatterStatusBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatDate } from "@/lib/utils";

export default function MatterListPage() {
  const timeSaved = firmTimeSavedSummary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-firm-text">Estate matters</h1>
        <p className="mt-1 text-sm text-firm-muted">
          Active estate administration matters, with document extraction and
          task completeness at a glance.
        </p>
      </div>

      {/* Time-saved indicator — the firm's ROI argument, kept prominent */}
      <div className="flex flex-wrap items-center gap-6 rounded-xl border border-firm-accent/30 bg-firm-accent-bg px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-firm-accent/15 text-firm-accent">
            <Clock3 className="h-4.5 w-4.5" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-firm-accent uppercase">
              Est. paralegal hours saved
            </p>
            <p className="text-lg font-semibold text-firm-text">
              {timeSaved.totalHoursSaved}h this period
            </p>
          </div>
        </div>
        <div className="h-8 w-px bg-firm-accent/20" />
        <div>
          <p className="text-xs font-medium tracking-wide text-firm-accent uppercase">
            Avg. per matter
          </p>
          <p className="text-lg font-semibold text-firm-text">{timeSaved.avgHoursPerMatter}h</p>
        </div>
        <div className="h-8 w-px bg-firm-accent/20" />
        <div>
          <p className="text-xs font-medium tracking-wide text-firm-accent uppercase">
            Active / awaiting client
          </p>
          <p className="text-lg font-semibold text-firm-text">{timeSaved.activeMatters}</p>
        </div>
      </div>

      <div className="rounded-xl border border-firm-border bg-firm-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-firm-border text-left text-xs font-medium tracking-wide text-firm-muted uppercase">
              <th className="px-5 py-2.5">Matter</th>
              <th className="px-5 py-2.5">Executor client</th>
              <th className="px-5 py-2.5">Extraction</th>
              <th className="px-5 py-2.5">Tasks</th>
              <th className="px-5 py-2.5">Status</th>
              <th className="px-5 py-2.5">Solicitor</th>
              <th className="px-5 py-2.5">Opened</th>
              <th className="px-5 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {matters.map((m) => (
              <tr key={m.id} className="border-b border-firm-border last:border-0 hover:bg-firm-bg/70">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5 shrink-0 text-firm-muted" />
                    <span className="font-medium text-firm-text">{m.estateName}</span>
                    {m.outstandingFromClient.length > 0 && m.status !== "closed" && (
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-firm-warn" />
                    )}
                  </div>
                </td>
                <td className="px-5 py-3 text-firm-muted">{m.executorClient}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16">
                      <ProgressBar
                        value={m.extractionCompleteness}
                        colorClass="bg-firm-accent"
                        trackClass="bg-firm-border"
                        height="h-1.5"
                      />
                    </div>
                    <span className="text-xs text-firm-muted">{m.extractionCompleteness}%</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16">
                      <ProgressBar
                        value={m.taskCompleteness}
                        colorClass="bg-firm-primary"
                        trackClass="bg-firm-border"
                        height="h-1.5"
                      />
                    </div>
                    <span className="text-xs text-firm-muted">{m.taskCompleteness}%</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <MatterStatusBadge status={m.status} />
                </td>
                <td className="px-5 py-3 text-firm-muted">{m.assignedSolicitor}</td>
                <td className="px-5 py-3 text-firm-muted">{formatDate(m.dateOpened)}</td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/firm/matters/${m.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-firm-accent hover:underline"
                  >
                    Open <ArrowRight className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
