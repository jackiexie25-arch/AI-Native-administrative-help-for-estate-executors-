import { CaseInfo, ExecutorTask, ExtractedDocument } from "@/lib/types";

export const caseInfo: CaseInfo = {
  deceasedName: "Margaret Anne Cole",
  dateOfDeath: "2026-07-18",
  relationshipToExecutor: "Mother",
  hasWill: true,
  executorName: "David Cole",
};

export const extractedDocuments: ExtractedDocument[] = [
  {
    id: "doc-1",
    fileName: "CBA_statement_June2026.pdf",
    documentType: "Bank statement",
    institutionId: "cba",
    accountType: "Everyday transaction account",
    balanceStatus: "Approx. $18,400 — below probate threshold",
    maskedAccountNumber: "•••• 4471",
    confidence: 0.94,
    status: "confirmed",
    uploadedAt: "2026-08-02T09:14:00+10:00",
  },
  {
    id: "doc-2",
    fileName: "AustralianSuper_member_statement.pdf",
    documentType: "Super member statement",
    institutionId: "australiansuper",
    accountType: "Super account with linked life insurance",
    balanceStatus: "Approx. $142,000",
    maskedAccountNumber: "•••• 8820",
    confidence: 0.88,
    status: "confirmed",
  uploadedAt: "2026-08-02T09:16:00+10:00",
  },
  {
    id: "doc-3",
    fileName: "will_scanned_copy.pdf",
    documentType: "Will",
    confidence: 0.71,
    status: "needs_review",
    uploadedAt: "2026-08-03T18:40:00+10:00",
  },
  {
    id: "doc-4",
    fileName: "origin_energy_final_bill.pdf",
    documentType: "Utility bill",
    institutionId: "origin",
    accountType: "Electricity — residential",
    balanceStatus: "Final balance $86.20 owing",
    maskedAccountNumber: "•••• 1029",
    confidence: 0.81,
    status: "needs_review",
    uploadedAt: "2026-08-04T11:02:00+10:00",
  },
  {
    id: "doc-5",
    fileName: "TAL_policy_letter.pdf",
    documentType: "Insurance policy letter",
    institutionId: "tal",
    accountType: "Term life policy",
    balanceStatus: "Sum insured $250,000",
    maskedAccountNumber: "TAL-••••-3312",
    confidence: 0.9,
    status: "confirmed",
    uploadedAt: "2026-08-05T08:30:00+10:00",
  },
];

export const executorTasks: ExecutorTask[] = [
  { id: "t-cba", institutionId: "cba", status: "confirmed" },
  {
    id: "t-westpac",
    institutionId: "westpac",
    status: "not_started",
    notes: "No statements uploaded yet — check for a joint account.",
  },
  {
    id: "t-australiansuper",
    institutionId: "australiansuper",
    status: "submitted",
    deadline: "2026-11-02",
  },
  {
    id: "t-centrelink",
    institutionId: "centrelink",
    status: "confirmed",
    notes: "Notified automatically via the Death Notification Service.",
  },
  {
    id: "t-ato",
    institutionId: "ato",
    status: "gathering",
    deadline: "2026-10-15",
  },
  {
    id: "t-tal",
    institutionId: "tal",
    status: "gathering",
    deadline: "2026-09-25",
  },
  {
    id: "t-origin",
    institutionId: "origin",
    status: "gathering",
    deadline: "2026-09-20",
  },
  {
    id: "t-telstra",
    institutionId: "telstra",
    status: "not_started",
  },
];

export const nextSteps = [
  "Review the extracted details from the will and the Origin Energy bill — confidence was lower on these two.",
  "Upload a Westpac statement if Margaret held a joint or secondary account there.",
  "TAL's 45-day claim window opened on 5 Aug — the claim form is due back by 25 Sep.",
];
