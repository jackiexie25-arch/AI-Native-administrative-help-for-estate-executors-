// Shared domain types used across all three surfaces (consumer, enterprise, firm).
// Everything in this prototype is mocked — no real backend or LLM calls.

export type InstitutionCategory =
  | "bank"
  | "super"
  | "insurer"
  | "government"
  | "utility";

export interface Institution {
  id: string;
  name: string;
  category: InstitutionCategory;
  initial: string;
  notifiedByDNS: boolean; // whether Australia's Death Notification Service reaches this org
  typicalTimeframeDays: number;
  probateThreshold?: string; // plain description of when probate/letters of administration kick in
  documentsRequired: string[];
  plainEnglish: string; // jargon translated to plain English
}

export type TaskStatus =
  | "not_started"
  | "gathering"
  | "submitted"
  | "confirmed";

export interface ExecutorTask {
  id: string;
  institutionId: string;
  status: TaskStatus;
  deadline?: string; // ISO date
  notes?: string;
}

export type ExtractionStatus = "needs_review" | "confirmed";

export interface ExtractedDocument {
  id: string;
  fileName: string;
  documentType: string;
  institutionId?: string;
  accountType?: string;
  balanceStatus?: string;
  maskedAccountNumber?: string;
  confidence: number; // 0-1
  status: ExtractionStatus;
  uploadedAt: string;
}

export interface CaseInfo {
  deceasedName: string;
  dateOfDeath: string;
  relationshipToExecutor: string;
  hasWill: boolean;
  executorName: string;
}

export type ClaimStatus =
  | "gathering_documents"
  | "in_review"
  | "pending_decision"
  | "approaching_deadline"
  | "completed";

export interface Claimant {
  id: string;
  name: string;
  claimType: "Death benefit" | "TPD" | "Life insurance" | "Income protection";
  fundOrInsurer: string;
  dateOpened: string;
  statutoryDeadline: string;
  documentCompleteness: number; // 0-100
  status: ClaimStatus;
  daysOpen: number;
  estimatedDaysToResolution: number;
  lastActivity: string;
  communicationLog: { date: string; channel: string; note: string }[];
  outstandingItems: string[];
}

export type MatterStatus = "active" | "awaiting_client" | "near_complete" | "closed";

export interface Matter {
  id: string;
  estateName: string;
  executorClient: string;
  dateOpened: string;
  assignedSolicitor: string;
  extractionCompleteness: number; // 0-100
  taskCompleteness: number; // 0-100
  status: MatterStatus;
  outstandingFromClient: string[];
  estimatedHoursSavedThisMatter: number;
  plainEnglishSummaryDraft: string;
}
