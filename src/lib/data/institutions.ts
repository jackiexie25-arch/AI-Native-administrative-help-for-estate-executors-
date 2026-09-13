import { Institution } from "@/lib/types";

// A representative matrix of major Australian institutions and their typical
// death-notification requirements. Mocked for demo purposes — not sourced
// from live institutional policy documents.
export const institutions: Institution[] = [
  {
    id: "cba",
    name: "Commonwealth Bank",
    category: "bank",
    initial: "CBA",
    notifiedByDNS: false,
    typicalTimeframeDays: 10,
    probateThreshold: "Probate typically required for balances over $50,000",
    documentsRequired: [
      "Certified copy of death certificate",
      "Executor photo ID",
      "Will (if one exists)",
      "Grant of probate (for higher-balance accounts)",
    ],
    plainEnglish:
      "The bank will freeze the account once notified, then release funds to the estate once it has sighted the death certificate and, for larger balances, a grant of probate.",
  },
  {
    id: "westpac",
    name: "Westpac",
    category: "bank",
    initial: "WBC",
    notifiedByDNS: false,
    typicalTimeframeDays: 10,
    probateThreshold: "Probate typically required for balances over $50,000",
    documentsRequired: [
      "Certified copy of death certificate",
      "Executor photo ID",
      "Deceased estate notification form",
    ],
    plainEnglish:
      "Westpac needs its own deceased-estate form filled in alongside the death certificate — it won't accept the government notification alone.",
  },
  {
    id: "nab",
    name: "NAB",
    category: "bank",
    initial: "NAB",
    notifiedByDNS: false,
    typicalTimeframeDays: 10,
    probateThreshold: "Probate typically required for balances over $50,000",
    documentsRequired: [
      "Certified copy of death certificate",
      "Executor photo ID",
      "Will (if one exists)",
    ],
  plainEnglish:
      "NAB places a hold on the account and asks the executor to complete an in-branch or online deceased estate notification.",
  },
  {
    id: "anz",
    name: "ANZ",
    category: "bank",
    initial: "ANZ",
    notifiedByDNS: false,
    typicalTimeframeDays: 14,
    probateThreshold: "Probate typically required for balances over $45,000",
    documentsRequired: [
      "Certified copy of death certificate",
      "Executor photo ID",
      "Grant of probate (for higher-balance accounts)",
    ],
    plainEnglish:
      "ANZ's threshold for requiring probate is a little lower than the other majors — worth checking early if the balance is close to the line.",
  },
  {
    id: "australiansuper",
    name: "AustralianSuper",
    category: "super",
    initial: "AS",
    notifiedByDNS: true,
    typicalTimeframeDays: 90,
    documentsRequired: [
      "Certified copy of death certificate",
      "Death benefit claim form",
      "Proof of relationship to deceased (for beneficiaries)",
      "Executor photo ID",
    ],
    plainEnglish:
      "Super death benefits don't automatically go through the will — the fund's trustee decides who receives the benefit based on any binding nomination on file. This is a fund decision, not something this tool can advise on.",
  },
  {
    id: "art",
    name: "Australian Retirement Trust",
    category: "super",
    initial: "ART",
    notifiedByDNS: true,
    typicalTimeframeDays: 90,
    documentsRequired: [
      "Certified copy of death certificate",
      "Death benefit claim form",
      "Executor photo ID",
    ],
    plainEnglish:
      "The fund has up to 90 days under its statutory obligations to process the death benefit claim once all documents are in.",
  },
  {
    id: "hostplus",
    name: "Hostplus",
    category: "super",
    initial: "HP",
    notifiedByDNS: true,
    typicalTimeframeDays: 90,
    documentsRequired: [
      "Certified copy of death certificate",
      "Death benefit claim form",
      "Proof of relationship to deceased (for beneficiaries)",
    ],
    plainEnglish:
      "Hostplus will contact any nominated beneficiaries directly once the claim form is lodged.",
  },
  {
    id: "awaresuper",
    name: "Aware Super",
    category: "super",
    initial: "AW",
    notifiedByDNS: true,
    typicalTimeframeDays: 90,
    documentsRequired: [
      "Certified copy of death certificate",
      "Death benefit claim form",
      "Executor photo ID",
    ],
    plainEnglish:
      "Aware Super may also hold linked life insurance — worth checking the member statement for an attached policy.",
  },
  {
    id: "centrelink",
    name: "Centrelink (Services Australia)",
    category: "government",
    initial: "CL",
    notifiedByDNS: true,
    typicalTimeframeDays: 28,
    documentsRequired: [
      "Certified copy of death certificate",
      "Notification of a customer's death form (if not already lodged)",
    ],
    plainEnglish:
      "Centrelink is notified automatically through the Death Notification Service, but any overpayments or pending reviews may still need executor follow-up.",
  },
  {
    id: "ato",
    name: "Australian Taxation Office",
    category: "government",
    initial: "ATO",
    notifiedByDNS: true,
    typicalTimeframeDays: 28,
    documentsRequired: [
      "Certified copy of death certificate",
      "Date of death tax return (if required)",
      "Executor photo ID",
    ],
    plainEnglish:
      "A date-of-death tax return may be required — this is a tax filing obligation, not a legal judgment call, but a tax agent can help if the estate's affairs are complex.",
  },
  {
    id: "tal",
    name: "TAL Life Insurance",
    category: "insurer",
    initial: "TAL",
    notifiedByDNS: false,
    typicalTimeframeDays: 45,
    documentsRequired: [
      "Certified copy of death certificate",
      "Claim form",
      "Proof of policy ownership",
      "Medical cause of death certificate (for some claim types)",
    ],
    plainEnglish:
      "Life insurers generally have a 45-day statutory window to make a claim decision once all requested documents are received.",
  },
  {
    id: "aia",
    name: "AIA Australia",
    category: "insurer",
    initial: "AIA",
    notifiedByDNS: false,
    typicalTimeframeDays: 45,
    documentsRequired: [
      "Certified copy of death certificate",
      "Claim form",
      "Proof of policy ownership",
    ],
    plainEnglish:
      "AIA will assign a claims consultant once the initial claim form is lodged — that person becomes the ongoing point of contact.",
  },
  {
    id: "mlc",
    name: "MLC Life Insurance",
    category: "insurer",
    initial: "MLC",
    notifiedByDNS: false,
    typicalTimeframeDays: 45,
    documentsRequired: [
      "Certified copy of death certificate",
      "Claim form",
      "Proof of policy ownership",
    ],
    plainEnglish:
      "Check whether the policy was held directly or inside a super fund — that changes which claim form applies.",
  },
  {
    id: "origin",
    name: "Origin Energy",
    category: "utility",
    initial: "OE",
    notifiedByDNS: true,
    typicalTimeframeDays: 14,
    documentsRequired: [
      "Certified copy of death certificate",
      "Final meter reading (if closing the account)",
    ],
    plainEnglish:
      "Utility accounts can usually be closed or transferred quickly once the final bill is settled from the estate.",
  },
  {
    id: "telstra",
    name: "Telstra",
    category: "utility",
    initial: "TLS",
    notifiedByDNS: true,
    typicalTimeframeDays: 14,
    documentsRequired: [
      "Certified copy of death certificate",
      "Account holder details",
    ],
    plainEnglish:
      "Telstra can close, transfer, or place a plan on hold — useful if a family member wants to keep the phone number.",
  },
];

export function getInstitution(id: string): Institution | undefined {
  return institutions.find((i) => i.id === id);
}

export const categoryLabels: Record<Institution["category"], string> = {
  bank: "Bank",
  super: "Super fund",
  insurer: "Life insurer",
  government: "Government",
  utility: "Utility",
};
