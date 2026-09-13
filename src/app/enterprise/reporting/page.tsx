"use client";

import { FileDown, TrendingDown, TrendingUp, ShieldCheck } from "lucide-react";
import { claimants, claimsOpsSummary } from "@/lib/data/enterprise";
import { formatDate } from "@/lib/utils";

function metricRow(
  label: string,
  before: string,
  after: string,
  improved: boolean,
  valueRose: boolean
) {
  const Icon = valueRose ? TrendingUp : TrendingDown;
  return (
    <tr className="border-b border-ent-border last:border-0">
      <td className="px-5 py-3 text-sm font-medium text-ent-text">{label}</td>
      <td className="px-5 py-3 text-sm text-ent-muted">{before}</td>
      <td className="px-5 py-3 text-sm font-semibold text-ent-text">{after}</td>
      <td className="px-5 py-3">
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium ${
            improved ? "text-ent-good" : "text-ent-danger"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {improved ? "Improved" : "Regressed"}
        </span>
      </td>
    </tr>
  );
}

export default function ReportingPage() {
  const summary = claimsOpsSummary();

  function handleExport() {
    const headers = [
      "Claimant",
      "Claim type",
      "Status",
      "Days open",
      "Document completeness (%)",
      "Statutory deadline",
    ];
    const rows = claimants.map((c) => [
      c.name,
      c.claimType,
      c.status,
      c.daysOpen,
      c.documentCompleteness,
      formatDate(c.statutoryDeadline),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "afterwards-claims-compliance-export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-ent-text">Compliance & reporting export</h1>
          <p className="mt-1 max-w-2xl text-sm text-ent-muted">
            Metrics formatted for internal governance and AFCA/ASIC reporting
            conversations — claim processing time, documentation
            completeness, and deadline adherence.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg bg-ent-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-ent-primary-dark"
        >
          <FileDown className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-ent-good/30 bg-ent-good-bg p-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ent-good" />
        <div>
          <p className="text-sm font-semibold text-ent-good">
            Reporting period average: {summary.avgDaysToCompletion} days to completion
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ent-text">
            Well inside the 45–90 day statutory response windows tracked
            across death benefit, TPD, and life insurance claim types. This
            report reflects administrative processing metrics only — it
            makes no representation about individual claim outcomes.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-ent-border bg-ent-surface">
        <div className="border-b border-ent-border px-5 py-3.5">
          <h2 className="text-sm font-semibold text-ent-text">
            Period-over-period metrics
          </h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-ent-border text-left text-xs font-medium tracking-wide text-ent-muted uppercase">
              <th className="px-5 py-2.5">Metric</th>
              <th className="px-5 py-2.5">Before Afterwards</th>
              <th className="px-5 py-2.5">Current period</th>
              <th className="px-5 py-2.5">Trend</th>
            </tr>
          </thead>
          <tbody>
            {metricRow("Avg. days to claim completion", "61 days", `${summary.avgDaysToCompletion} days`, true, false)}
            {metricRow("Documentation complete on first pass", "29%", `${summary.docCompletePct}%`, true, true)}
            {metricRow("Claims breaching statutory deadline", "9%", "2%", true, false)}
            {metricRow("Claimant-initiated status enquiries", "3.4 / claim", "1.1 / claim", true, false)}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-ent-border bg-ent-bg p-5 text-xs leading-relaxed text-ent-muted">
        This export is intended to support internal compliance review and
        regulator conversations regarding claims handling timeliness. It
        contains operational metrics only and should be read alongside your
        fund&rsquo;s existing AFCA/ASIC reporting obligations, not in place of
        them.
      </div>
    </div>
  );
}
