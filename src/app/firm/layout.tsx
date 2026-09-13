import Link from "next/link";
import { FolderOpen, ArrowLeft } from "lucide-react";
import { Disclaimer } from "@/components/shared/Disclaimer";

export default function FirmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-firm-bg text-firm-text">
      <header className="border-b border-firm-border bg-firm-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-medium text-firm-muted hover:text-firm-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Afterwards
            </Link>
            <span className="h-4 w-px bg-firm-border" />
            <Link href="/firm" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-firm-accent" strokeWidth={1.75} />
              <span className="text-sm font-semibold text-firm-text">
                Fitzgerald &amp; Okafor Lawyers
              </span>
              <span className="rounded border border-firm-border px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-firm-muted uppercase">
                Estates matter workspace
              </span>
            </Link>
          </div>
          <p className="text-xs text-firm-muted">L. Fitzgerald, Solicitor</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 pt-4">
        <Disclaimer tone="firm" compact />
      </div>

      <main className="mx-auto max-w-6xl px-6 py-7">{children}</main>
    </div>
  );
}
