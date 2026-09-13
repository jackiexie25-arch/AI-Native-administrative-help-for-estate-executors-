import Link from "next/link";
import {
  Clock,
  AlertTriangle,
  FileCheck,
  Layers,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { claimants, claimsOpsSummary } from "@/lib/data/enterprise";
import { ClaimStatusBadge } from "@/components/enterprise/ClaimStatusBadge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatDate, daysUntil } from "@/lib/utils";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone = "default",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "danger" | "good";
}) {
  const iconTone =
    tone === "danger"
      ? "bg-ent-danger-bg text-ent-danger"
      : tone === "good"
      ? "bg-ent-good-bg text-ent-good"
      : "bg-ent-accent/10 text-ent-accent";
  return (
    <div className="rounded-xl border border-ent-border bg-ent-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-wide text-ent-muted uppercase">
          {label}
        </p>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconTone}`}>
          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
      </div>
      <p className="mt-2 text-2xl font-semibold text-ent-text">{value}</p>
      {sub && <p className="mt-1 text-xs text-ent-muted">{sub}</p>}
    </div>
  );
}

export default function EnterpriseDashboard() {
  const summary = claimsOpsSummary();

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ent-text">Claims operations dashboard</h1>
          <p className="mt-1 text-sm text-ent-muted">
            Aggregate view across all active claimants using the white-labeled
            executor tool.
          </p>
        </div>
        <div className="hidden items-center gap-1.5 rounded-lg border border-ent-border bg-ent-surface px-3 py-1.5 text-xs text-ent-muted sm:flex">
          <ArrowUpRight className="h-3.5 w-3.5 text-ent-good" />
          Reporting period: last 90 days
        </div>
      </div>

      {/* Why we pay for this: the case-making stat row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Layers}
          label="Active claims"
          value={String(summary.activeClaimsCount)}
          sub={`${summary.totalClaims} total this period`}
        />
        <StatCard
          icon={Clock}
          label="Avg. days to completion"
          value={`${summary.avgDaysToCompletion}d`}
          sub="Down from 61d before rollout"
          tone="good"
        />
        <StatCard
          icon={AlertTriangle}
          label="Approaching statutory deadline"
          value={String(summary.approachingDeadline.length)}
          sub="Within 14 days of AFCA/ASIC window"
          tone={summary.approachingDeadline.length > 0 ? "danger" : "default"}
        />
        <StatCard
          icon={FileCheck}
          label="Documentation complete"
          value={`${summary.docCompletePct}%`}
          sub="≥80% of required documents received"
          tone="good"
        />
      </div>

      {/* Deadline risk callout */}
      {summary.approachingDeadline.length > 0 && (
        <div className="rounded-xl border border-ent-danger/30 bg-ent-danger-bg p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-ent-danger" />
            <h2 className="text-sm font-semibold text-ent-danger">
              {summary.approachingDeadline.length} claim
              {summary.approachingDeadline.length > 1 ? "s" : ""} approaching
              their statutory response window
            </h2>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {summary.approachingDeadline.map((c) => (
              <Link
                key={c.id}
                href={`/enterprise/claimants/${c.id}`}
                className="flex items-center justify-between rounded-lg bg-white/60 px-3.5 py-2.5 text-sm hover:bg-white"
              >
                <div>
                  <p className="font-medium text-ent-text">{c.name}</p>
                  <p className="text-xs text-ent-muted">{c.claimType}</p>
                </div>
                <p className="text-xs font-medium text-ent-danger">
                  {daysUntil(c.statutoryDeadline)}d left · due {formatDate(c.statutoryDeadline)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Full claims table */}
      <div className="rounded-xl border border-ent-border bg-ent-surface">
        <div className="flex items-center justify-between border-b border-ent-border px-5 py-3.5">
          <h2 className="text-sm font-semibold text-ent-text">All claims</h2>
          <p className="text-xs text-ent-muted">{claimants.length} claims</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ent-border text-left text-xs font-medium tracking-wide text-ent-muted uppercase">
                <th className="px-5 py-2.5">Claimant</th>
                <th className="px-5 py-2.5">Claim type</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5">Documentation</th>
                <th className="px-5 py-2.5">Days open</th>
                <th className="px-5 py-2.5">Statutory deadline</th>
                <th className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {claimants.map((c) => (
                <tr key={c.id} className="border-b border-ent-border last:border-0 hover:bg-ent-bg/60">
                  <td className="px-5 py-3 font-medium text-ent-text">{c.name}</td>
                  <td className="px-5 py-3 text-ent-muted">{c.claimType}</td>
                  <td className="px-5 py-3">
                    <ClaimStatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <ProgressBar
                          value={c.documentCompleteness}
                          colorClass={c.documentCompleteness >= 80 ? "bg-ent-good" : "bg-ent-accent"}
                          trackClass="bg-ent-border"
                          height="h-1.5"
                        />
                      </div>
                      <span className="text-xs text-ent-muted">{c.documentCompleteness}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ent-muted">{c.daysOpen}d</td>
                  <td className="px-5 py-3 text-ent-muted">{formatDate(c.statutoryDeadline)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/enterprise/claimants/${c.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-ent-accent hover:underline"
                    >
                      View <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
