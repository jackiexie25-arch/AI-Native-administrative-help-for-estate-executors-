# Afterwards

A multi-model AI-native administrative orchestration prototype for Australian estate
executors, built for Enactus Melbourne's EnAccelerator. This is a **UI prototype** —
mocked data throughout, no real backend, no real LLM calls, no auth.

## The pitch

When someone dies in Australia, their executor has to notify and satisfy dozens of
institutions — banks, super funds, insurers, government agencies, utilities — each
with different requirements, thresholds and deadlines. Afterwards is one AI
orchestration layer (document extraction → requirement matching → task tracking →
letter generation) licensed three different ways:

- **B2C** — a direct consumer app for self-represented executors (`/executor`)
- **B2B2C** — a white-labeled claims-support tool licensed to super funds and life
  insurers (`/enterprise`)
- **B2B** — a matter workspace licensed to law firms and professional trustees
  (`/firm`)

Start at `/` for the mode-switcher landing page that frames all three surfaces as one
platform.

## Guardrails

Afterwards helps with administrative tasks only — it never gives legal advice,
drafts wills, assesses testamentary capacity, or advises on entitlements or disputes.
A contextual disclaimer to this effect appears on every surface.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + lucide-react. All data is
mocked via fixtures in `src/lib/data/`.
