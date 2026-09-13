import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Building2,
  Scale,
  Layers,
  FileSearch,
  ListChecks,
  Send,
} from "lucide-react";

const surfaces = [
  {
    href: "/executor",
    icon: Heart,
    title: "For Executors",
    audience: "B2C · $199–499 one-off",
    description:
      "A calm, guided companion for a self-represented executor — upload documents, track every institution, and generate the paperwork.",
    accent: "border-warm-primary/30 hover:border-warm-primary bg-warm-bg",
    iconBg: "bg-warm-primary/10 text-warm-primary",
    cta: "text-warm-primary",
  },
  {
    href: "/enterprise",
    icon: Building2,
    title: "For Super Funds & Insurers",
    audience: "B2B2C · white-labeled claims support",
    description:
      "The same engine, licensed and rebranded, deployed to claimants to cut processing delays and AFCA/ASIC complaint exposure.",
    accent: "border-ent-primary/30 hover:border-ent-primary bg-ent-bg",
    iconBg: "bg-ent-primary/10 text-ent-primary",
    cta: "text-ent-primary",
  },
  {
    href: "/firm",
    icon: Scale,
    title: "For Law Firms",
    audience: "B2B · paralegal-hour savings",
    description:
      "A no-frills matter workspace that turns client-provided documents into tracked tasks and drafting aids solicitors review before sending.",
    accent: "border-firm-primary/30 hover:border-firm-primary bg-firm-bg",
    iconBg: "bg-firm-primary/10 text-firm-primary",
    cta: "text-firm-accent",
  },
];

const engineSteps = [
  { icon: FileSearch, label: "Extract", detail: "Parses wills, statements, bills and notices" },
  { icon: Layers, label: "Match", detail: "Checks each institution's requirements & thresholds" },
  { icon: ListChecks, label: "Track", detail: "Tasks move from gathering → submitted → confirmed" },
  { icon: Send, label: "Generate", detail: "Drafts plain-English letters and notifications" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfaf8]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
            Afterwards
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Administrative help for estate executors — built once, licensed three ways.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            When someone dies, their executor has to notify and satisfy dozens of
            institutions — each with different forms, thresholds and deadlines.
            Afterwards is one AI orchestration layer that does the document
            reading, requirement matching, and task tracking — accessed three
            different ways depending on who&rsquo;s paying for it.
          </p>
        </div>

        {/* The core idea, visually: one engine, three access points */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
            {engineSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3 sm:flex-1 sm:flex-col sm:items-center sm:gap-0 sm:text-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <step.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="sm:contents">
                  <p className="sm:mt-2 text-sm font-semibold text-neutral-900">{step.label}</p>
                  <p className="mt-1 text-xs leading-snug text-neutral-500 sm:max-w-[9rem]">{step.detail}</p>
                </div>
                {i < engineSteps.length - 1 && (
                  <ArrowRight className="mx-2 hidden h-4 w-4 shrink-0 text-neutral-300 sm:mt-5 sm:block" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-dashed border-neutral-200 pt-4 text-center">
            <p className="text-sm text-neutral-500">
              One orchestration layer →{" "}
              <span className="font-medium text-neutral-800">
                three branded surfaces
              </span>{" "}
              below, each shaped for a different buyer.
            </p>
          </div>
        </div>

        {/* Mode switcher cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {surfaces.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group flex flex-col rounded-2xl border-2 p-6 shadow-sm transition-colors ${s.accent}`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.iconBg}`}>
                <s.icon className="h-5.5 w-5.5" strokeWidth={1.75} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-neutral-900">{s.title}</h2>
              <p className="mt-1 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                {s.audience}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                {s.description}
              </p>
              <span
                className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium ${s.cta}`}
              >
                Enter demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-xl border border-neutral-200 bg-white px-5 py-4 text-center text-xs leading-relaxed text-neutral-500">
          Afterwards provides administrative help only — document reading, requirement
          matching, and task tracking. It never gives legal advice, drafts wills, assesses
          testamentary capacity, or advises on entitlements or disputes. This is a UI
          prototype with mocked data; no real institutions are contacted.
        </div>
      </div>
    </main>
  );
}
