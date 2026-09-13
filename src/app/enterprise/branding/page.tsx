"use client";

import { useState } from "react";
import { Upload, CheckCircle2, Circle } from "lucide-react";

const presets = [
  {
    id: "generic",
    label: "Generic (Afterwards)",
    primary: "#3f6659",
    accent: "#c97b4a",
    bg: "#faf6f0",
    logoText: "Afterwards",
  },
  {
    id: "australiansuper",
    label: "AustralianSuper",
    primary: "#e4002b",
    accent: "#1a1a1a",
    bg: "#fff5f6",
    logoText: "AustralianSuper",
  },
];

function MiniAppPreview({ preset }: { preset: (typeof presets)[number] }) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-ent-border shadow-sm"
      style={{ backgroundColor: preset.bg }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: preset.primary }}
      >
        <p className="text-sm font-semibold text-white">{preset.logoText}</p>
        <div className="h-2 w-16 rounded-full bg-white/30" />
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-lg bg-white/70 p-3">
          <p className="text-xs font-medium text-neutral-500">Claim progress</p>
          <p className="mt-1 text-lg font-semibold text-neutral-800">64% complete</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-black/10">
            <div
              className="h-1.5 rounded-full"
              style={{ width: "64%", backgroundColor: preset.accent }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {["Death cert", "Claim form", "ID check"].map((label, i) => (
            <div
              key={label}
              className="flex-1 rounded-lg bg-white/70 p-2.5 text-center"
            >
              {i < 2 ? (
                <CheckCircle2
                  className="mx-auto h-3.5 w-3.5"
                  style={{ color: preset.primary }}
                />
              ) : (
                <Circle className="mx-auto h-3.5 w-3.5 text-neutral-300" />
              )}
              <p className="mt-1 text-[10px] text-neutral-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrandingPage() {
  const [customPrimary, setCustomPrimary] = useState(presets[1].primary);
  const [customAccent, setCustomAccent] = useState(presets[1].accent);

  const customPreset = {
    id: "custom",
    label: "AustralianSuper (live preview)",
    primary: customPrimary,
    accent: customAccent,
    bg: "#fff8f8",
    logoText: "AustralianSuper",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ent-text">White-label branding</h1>
        <p className="mt-1 text-sm text-ent-muted">
          Same underlying engine as the consumer executor app — wrapped in
          your fund&rsquo;s logo, colors and domain for claimants.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 rounded-xl border border-ent-border bg-ent-surface p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold text-ent-text">Brand settings</h2>

          <div>
            <label className="text-xs font-medium tracking-wide text-ent-muted uppercase">
              Logo
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-lg border border-dashed border-ent-border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-ent-bg text-ent-muted">
                <Upload className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-ent-text">australiansuper-logo.svg</p>
                <p className="text-[11px] text-ent-muted">Uploaded — used across claimant portal</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium tracking-wide text-ent-muted uppercase">
              Primary color
            </label>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="color"
                value={customPrimary}
                onChange={(e) => setCustomPrimary(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border border-ent-border"
              />
              <input
                type="text"
                value={customPrimary}
                onChange={(e) => setCustomPrimary(e.target.value)}
                className="w-full rounded-lg border border-ent-border px-3 py-2 text-sm text-ent-text"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium tracking-wide text-ent-muted uppercase">
              Accent color
            </label>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="color"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border border-ent-border"
              />
              <input
                type="text"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="w-full rounded-lg border border-ent-border px-3 py-2 text-sm text-ent-text"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium tracking-wide text-ent-muted uppercase">
              Claimant-facing domain
            </label>
            <input
              readOnly
              value="claims.australiansuper.com.au/support"
              className="mt-2 w-full rounded-lg border border-ent-border bg-ent-bg px-3 py-2 text-sm text-ent-muted"
            />
          </div>

          <button className="w-full rounded-lg bg-ent-primary py-2.5 text-sm font-semibold text-white hover:bg-ent-primary-dark">
            Publish branding
          </button>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <p className="text-sm font-medium text-ent-text">
            Same engine, licensed — before and after
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium text-ent-muted">Generic consumer app (Surface 1)</p>
              <MiniAppPreview preset={presets[0]} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-ent-muted">White-labeled for AustralianSuper</p>
              <MiniAppPreview preset={customPreset} />
            </div>
          </div>
          <p className="rounded-lg bg-ent-bg px-4 py-3 text-xs leading-relaxed text-ent-muted">
            Every screen a claimant sees — document upload, task tracking,
            plain-English explainers — runs on the same orchestration engine
            as the direct-to-consumer product. Only the presentation layer
            changes.
          </p>
        </div>
      </div>
    </div>
  );
}
