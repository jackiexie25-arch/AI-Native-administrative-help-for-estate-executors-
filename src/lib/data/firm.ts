import { Matter } from "@/lib/types";

export const matters: Matter[] = [
  {
    id: "m-2201",
    estateName: "Estate of Margaret Anne Cole",
    executorClient: "David Cole",
    dateOpened: "2026-08-01",
    assignedSolicitor: "L. Fitzgerald",
    extractionCompleteness: 85,
    taskCompleteness: 60,
    status: "active",
    outstandingFromClient: [
      "Westpac statement (if joint account exists)",
      "Confirmation of will's original location",
    ],
    estimatedHoursSavedThisMatter: 4.5,
    plainEnglishSummaryDraft:
      "We've identified five institutions holding assets: CBA, AustralianSuper, TAL Life Insurance, Origin Energy and a possible Westpac account still to confirm. AustralianSuper's death benefit claim has been lodged and is within its 90-day window. TAL's claim form is due back by 25 September.",
  },
  {
    id: "m-2189",
    estateName: "Estate of Harold James Pearce",
    executorClient: "Linda Pearce",
    dateOpened: "2026-07-14",
    assignedSolicitor: "L. Fitzgerald",
    extractionCompleteness: 100,
    taskCompleteness: 90,
    status: "near_complete",
    outstandingFromClient: ["Signed ATO date-of-death return"],
    estimatedHoursSavedThisMatter: 6.0,
    plainEnglishSummaryDraft:
      "All institution notifications are submitted or confirmed. The only outstanding item is the signed date-of-death tax return, which the client has been sent for signature.",
  },
  {
    id: "m-2233",
    estateName: "Estate of Beatrice Nguyen",
    executorClient: "Kevin Nguyen",
    dateOpened: "2026-08-28",
    assignedSolicitor: "R. Okafor",
    extractionCompleteness: 40,
    taskCompleteness: 15,
    status: "awaiting_client",
    outstandingFromClient: [
      "Bank statements for all known accounts",
      "Superannuation member statement",
      "Certified copy of death certificate",
    ],
    estimatedHoursSavedThisMatter: 1.5,
    plainEnglishSummaryDraft:
      "Very early stage — only the death certificate has been provided so far. Follow up with the client for bank and super statements before institution notifications can be prepared.",
  },
  {
    id: "m-2177",
    estateName: "Estate of Frank Dimitriou",
    executorClient: "Estate of Frank Dimitriou (professional trustee)",
    dateOpened: "2026-06-02",
    assignedSolicitor: "R. Okafor",
    extractionCompleteness: 100,
    taskCompleteness: 100,
    status: "closed",
    outstandingFromClient: [],
    estimatedHoursSavedThisMatter: 7.0,
    plainEnglishSummaryDraft:
      "All institutions confirmed and matter closed. Final estate distribution proceeded without further administrative follow-up required.",
  },
  {
    id: "m-2245",
    estateName: "Estate of Susan Wallace",
    executorClient: "Michael Wallace",
    dateOpened: "2026-09-05",
    assignedSolicitor: "L. Fitzgerald",
    extractionCompleteness: 55,
    taskCompleteness: 30,
    status: "active",
    outstandingFromClient: [
      "MLC life insurance policy documents",
      "Telstra account details",
    ],
    estimatedHoursSavedThisMatter: 2.0,
    plainEnglishSummaryDraft:
      "CBA and Centrelink notifications confirmed. Still waiting on policy documents from the client to begin the MLC life insurance claim.",
  },
];

export function getMatter(id: string) {
  return matters.find((m) => m.id === id);
}

export function firmTimeSavedSummary() {
  const totalHoursSaved = matters.reduce(
    (sum, m) => sum + m.estimatedHoursSavedThisMatter,
    0
  );
  const avgHoursPerMatter = totalHoursSaved / matters.length;
  return {
    totalHoursSaved: Math.round(totalHoursSaved * 10) / 10,
    avgHoursPerMatter: Math.round(avgHoursPerMatter * 10) / 10,
    activeMatters: matters.filter(
      (m) => m.status === "active" || m.status === "awaiting_client"
    ).length,
  };
}
