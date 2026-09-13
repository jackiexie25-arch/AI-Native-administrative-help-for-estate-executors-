import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Palette,
  FileBarChart,
  ArrowLeft,
} from "lucide-react";
import { Disclaimer } from "@/components/shared/Disclaimer";

const navItems = [
  { href: "/enterprise", icon: LayoutDashboard, label: "Claims dashboard" },
  { href: "/enterprise/branding", icon: Palette, label: "White-label branding" },
  { href: "/enterprise/reporting", icon: FileBarChart, label: "Compliance reporting" },
];

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ent-bg text-ent-text">
      <header className="border-b border-ent-border bg-ent-primary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Afterwards
            </Link>
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-[10px] font-bold text-ent-primary">
                AS
              </div>
              <p className="text-sm font-semibold text-white">
                AustralianSuper Claims Portal
              </p>
              <span className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-white/80 uppercase">
                Powered by Afterwards
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Users className="h-3.5 w-3.5" />
            Priya Sharma · Claims Operations
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl items-center gap-1 px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-white/70 hover:border-white/40 hover:text-white"
            >
              <item.icon className="h-4 w-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-4">
        <Disclaimer tone="enterprise" compact />
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
