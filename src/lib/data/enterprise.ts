import { Claimant } from "@/lib/types";

export const claimants: Claimant[] = [
  {
    id: "cl-1001",
    name: "David Cole",
    claimType: "Death benefit",
    fundOrInsurer: "AustralianSuper",
    dateOpened: "2026-08-02",
    statutoryDeadline: "2026-11-02",
    documentCompleteness: 80,
    status: "in_review",
    daysOpen: 42,
    estimatedDaysToResolution: 12,
    lastActivity: "2026-09-10",
    communicationLog: [
      { date: "2026-08-02", channel: "Portal", note: "Claim opened; welcome pack sent." },
      { date: "2026-08-09", channel: "Email", note: "Requested proof of relationship for secondary beneficiary." },
      { date: "2026-09-10", channel: "Portal", note: "Claimant uploaded death benefit claim form." },
    ],
    outstandingItems: ["Proof of relationship — secondary beneficiary"],
  },
  {
    id: "cl-1002",
    name: "Priya Nair",
    claimType: "Death benefit",
    fundOrInsurer: "AustralianSuper",
    dateOpened: "2026-06-30",
    statutoryDeadline: "2026-09-25",
    documentCompleteness: 45,
    status: "approaching_deadline",
    daysOpen: 75,
    estimatedDaysToResolution: 20,
    lastActivity: "2026-08-22",
    communicationLog: [
      { date: "2026-06-30", channel: "Portal", note: "Claim opened." },
      { date: "2026-07-15", channel: "Phone", note: "Claimant reported difficulty locating certified death certificate." },
      { date: "2026-08-22", channel: "Email", note: "Reminder sent — no response yet." },
    ],
    outstandingItems: [
      "Certified death certificate",
      "Executor/administrator ID",
    ],
  },
  {
    id: "cl-1003",
    name: "Michael Tran",
    claimType: "Life insurance",
    fundOrInsurer: "AustralianSuper",
    dateOpened: "2026-07-31",
    statutoryDeadline: "2026-09-24",
    documentCompleteness: 30,
    status: "approaching_deadline",
    daysOpen: 44,
    estimatedDaysToResolution: 25,
    lastActivity: "2026-09-09",
    communicationLog: [
      { date: "2026-07-31", channel: "Portal", note: "Claim opened." },
      { date: "2026-09-09", channel: "Email", note: "Requested medical cause of death certificate." },
    ],
    outstandingItems: [
      "Medical cause of death certificate",
      "Claim form signature page",
    ],
  },
  {
    id: "cl-1004",
    name: "Sarah Whitfield",
    claimType: "Death benefit",
    fundOrInsurer: "AustralianSuper",
    dateOpened: "2026-08-20",
    statutoryDeadline: "2026-11-18",
    documentCompleteness: 95,
    status: "pending_decision",
    daysOpen: 24,
    estimatedDaysToResolution: 5,
    lastActivity: "2026-09-11",
    communicationLog: [
      { date: "2026-08-20", channel: "Portal", note: "Claim opened." },
      { date: "2026-09-11", channel: "Portal", note: "All documents received; queued for trustee decision." },
    ],
    outstandingItems: [],
  },
  {
    id: "cl-1005",
    name: "James O'Halloran",
    claimType: "TPD",
    fundOrInsurer: "AustralianSuper",
    dateOpened: "2026-05-12",
    statutoryDeadline: "2026-08-26",
    documentCompleteness: 100,
    status: "completed",
    daysOpen: 92,
    estimatedDaysToResolution: 0,
    lastActivity: "2026-08-26",
    communicationLog: [
      { date: "2026-05-12", channel: "Portal", note: "Claim opened." },
      { date: "2026-08-26", channel: "Portal", note: "Claim approved and paid." },
    ],
    outstandingItems: [],
  },
  {
    id: "cl-1006",
    name: "Grace Kim",
    claimType: "Death benefit",
    fundOrInsurer: "AustralianSuper",
    dateOpened: "2026-09-01",
    statutoryDeadline: "2026-12-01",
    documentCompleteness: 20,
    status: "gathering_documents",
    daysOpen: 12,
    estimatedDaysToResolution: 35,
    lastActivity: "2026-09-08",
    communicationLog: [
      { date: "2026-09-01", channel: "Portal", note: "Claim opened; welcome pack sent." },
      { date: "2026-09-08", channel: "Portal", note: "Claimant uploaded death certificate." },
    ],
    outstandingItems: [
      "Death benefit claim form",
      "Proof of relationship",
      "Executor photo ID",
    ],
  },
  {
    id: "cl-1007",
    name: "Robert Ferraro",
    claimType: "Income protection",
    fundOrInsurer: "AustralianSuper",
    dateOpened: "2026-08-11",
    statutoryDeadline: "2026-09-25",
    documentCompleteness: 60,
    status: "in_review",
    daysOpen: 33,
    estimatedDaysToResolution: 10,
    lastActivity: "2026-09-09",
    communicationLog: [
      { date: "2026-08-11", channel: "Portal", note: "Claim opened." },
      { date: "2026-09-09", channel: "Email", note: "Requested updated medical certificate." },
    ],
    outstandingItems: ["Updated medical certificate"],
  },
];

export function claimsOpsSummary() {
  const activeClaims = claimants.filter((c) => c.status !== "completed");
  const avgDays =
    claimants.reduce((sum, c) => sum + c.daysOpen, 0) / claimants.length;
  const approachingDeadline = claimants.filter(
    (c) => c.status === "approaching_deadline"
  );
  const completeDocs = claimants.filter((c) => c.documentCompleteness >= 80)
    .length;
  const docCompletePct = Math.round((completeDocs / claimants.length) * 100);

  return {
    activeClaimsCount: activeClaims.length,
    avgDaysToCompletion: Math.round(avgDays),
    approachingDeadline,
    docCompletePct,
    totalClaims: claimants.length,
  };
}

export function getClaimant(id: string) {
  return claimants.find((c) => c.id === id);
}
