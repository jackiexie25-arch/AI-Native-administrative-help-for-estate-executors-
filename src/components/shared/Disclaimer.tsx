import { ShieldAlert } from "lucide-react";

type Tone = "warm" | "enterprise" | "firm";

const toneClasses: Record<Tone, string> = {
  warm: "bg-warm-surface-2 border-warm-border text-warm-text",
  enterprise: "bg-ent-warn-bg border-ent-border text-ent-text",
  firm: "bg-firm-accent-bg border-firm-border text-firm-text",
};

const iconClasses: Record<Tone, string> = {
  warm: "text-warm-primary",
  enterprise: "text-ent-warn",
  firm: "text-firm-accent",
};

export function Disclaimer({
  tone = "warm",
  compact = false,
}: {
  tone?: Tone;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs leading-relaxed ${toneClasses[tone]}`}
    >
      <ShieldAlert
        className={`mt-0.5 h-4 w-4 shrink-0 ${iconClasses[tone]}`}
        strokeWidth={2}
      />
      <p>
        <span className="font-medium">Administrative help only, not legal advice.</span>{" "}
        {compact
          ? "This tool tracks paperwork and requirements — it doesn't assess entitlements or disputes."
          : "This tool identifies what institutions require and tracks paperwork — it never advises on entitlements, disputes, or testamentary matters. For legal advice, please speak to a qualified solicitor."}
      </p>
    </div>
  );
}
