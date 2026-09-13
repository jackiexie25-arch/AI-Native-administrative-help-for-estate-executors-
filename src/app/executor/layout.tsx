import Link from "next/link";
import {
  Home,
  Upload,
  ListChecks,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { caseInfo } from "@/lib/data/executor";

const navItems = [
  { href: "/executor", icon: Home, label: "Home" },
  { href: "/executor/documents", icon: Upload, label: "Documents" },
  { href: "/executor/tasks", icon: ListChecks, label: "Tasks" },
  { href: "/executor/letters", icon: Mail, label: "Letters" },
];

export default function ExecutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-warm-bg text-warm-text">
      <header className="border-b border-warm-border bg-warm-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-medium text-warm-muted hover:text-warm-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Afterwards
            </Link>
            <span className="h-4 w-px bg-warm-border" />
            <div>
              <p className="text-sm font-semibold text-warm-text">
                Managing {caseInfo.deceasedName}&rsquo;s affairs
              </p>
              <p className="text-xs text-warm-muted">
                Executor: {caseInfo.executorName}
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-warm-text/80 hover:bg-warm-surface-2 hover:text-warm-primary"
              >
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-warm-border px-4 py-2 sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-warm-text/80 hover:bg-warm-surface-2"
            >
              <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-5xl px-6 pt-4">
        <Disclaimer tone="warm" compact />
      </div>

      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
