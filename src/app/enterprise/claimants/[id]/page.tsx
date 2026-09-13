import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, FileWarning, MessageSquare } from "lucide-react";
import { getClaimant, claimants } from "@/lib/data/enterprise";
import { ClaimStatusBadge } from "@/components/enterprise/ClaimStatusBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatDate, daysUntil } from "@/lib/utils";

export function generateStaticParams() {
  return claimants.map((c) => ({ id: c.id }));
}

export default async function ClaimantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const claimant = getClaimant(id);
  if (!claimant) notFound();

  const days = daysUntil(claimant.statutoryDeadline);

  return (
    <div className="space-y-6">
      <Link
        href="/enterprise"
        className="flex items-center gap-1.5 text-xs font-medium text-ent-muted hover:text-ent-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to claims dashboard
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-ent-border bg-ent-surface p-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-ent-text">{claimant.name}</h1>
            <ClaimStatusBadge status={claimant.status} />
          </div>
          <p className="mt-1 text-sm text-ent-muted">
            {claimant.claimType} · {claimant.fundOrInsurer} · opened{" "}
            {formatDate(claimant.dateOpened)}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 text-right">
          <div>
            <p className="text-xs font-medium tracking-wide text-ent-muted uppercase">
              Days open
            </p>
            <p className="mt-1 text-lg font-semibold text-ent-text">{claimant.daysOpen}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-ent-muted uppercase">
              Est. resolution
            </p>
            <p className="mt-1 text-lg font-semibold text-ent-text">
              {claimant.estimatedDaysToResolution === 0
                ? "Done"
                : `${claimant.estimatedDaysToResolution}d`}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-ent-muted uppercase">
              Statutory deadline
            </p>
            <p
              className={`mt-1 text-lg font-semibold ${
                days <= 14 ? "text-ent-danger" : "text-ent-text"
              }`}
            >
              {formatDate(claimant.statutoryDeadline)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Document completeness */}
          <div className="rounded-xl border border-ent-border bg-ent-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ent-text">Document completeness</h2>
              <span className="text-sm font-medium text-ent-text">
                {claimant.documentCompleteness}%
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar
                value={claimant.documentCompleteness}
                colorClass={claimant.documentCompleteness >= 80 ? "bg-ent-good" : "bg-ent-accent"}
                trackClass="bg-ent-border"
                height="h-2"
              />
            </div>
          </div>

          {/* Outstanding items */}
          <div className="rounded-xl border border-ent-border bg-ent-surface p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ent-text">
              <FileWarning className="h-4 w-4 text-ent-warn" />
              Outstanding items
            </h2>
            {claimant.outstandingItems.length === 0 ? (
              <p className="mt-3 text-sm text-ent-good">
                Nothing outstanding — all required documentation received.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {claimant.outstandingItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-lg bg-ent-warn-bg px-3.5 py-2.5 text-sm text-ent-text"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-ent-warn" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Communication log */}
          <div className="rounded-xl border border-ent-border bg-ent-surface p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ent-text">
              <MessageSquare className="h-4 w-4 text-ent-accent" />
              Communication log
            </h2>
            <div className="mt-3 space-y-3">
              {claimant.communicationLog.map((log, i) => (
                <div key={i} className="flex gap-3 border-l-2 border-ent-border pl-3.5">
                  <div className="text-xs text-ent-muted whitespace-nowrap">
                    {formatDate(log.date)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ent-accent">{log.channel}</p>
                    <p className="text-sm text-ent-text">{log.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-ent-border bg-ent-surface p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ent-text">
              <Clock className="h-4 w-4 text-ent-muted" />
              Time to resolution
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ent-muted">
              Based on current documentation completeness and historical
              processing times for {claimant.claimType.toLowerCase()} claims,
              this case is estimated to resolve in{" "}
              <span className="font-semibold text-ent-text">
                {claimant.estimatedDaysToResolution} days
              </span>
              .
            </p>
          </div>
          <div className="rounded-xl border border-ent-border bg-ent-bg p-5 text-xs leading-relaxed text-ent-muted">
            This is an internal operations view. It shows administrative
            progress only — it does not represent, and must not be
            communicated as, a decision on the claimant&rsquo;s entitlement.
          </div>
        </div>
      </div>
    </div>
  );
}
