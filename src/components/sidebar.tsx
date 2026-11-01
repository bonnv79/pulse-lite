"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, X } from "lucide-react";
import { mainNav, proNav, PRO_URL } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="flex flex-col gap-0.5">
      {mainNav.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
              active ? "bg-brand-soft text-brand" : "text-muted hover:bg-surface-2 hover:text-fg",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </Link>
        );
      })}
      {proNav.map(({ label, icon: Icon }) => (
        <a
          key={label}
          href={PRO_URL}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted/70 transition hover:bg-surface-2 hover:text-fg"
        >
          <Icon className="size-4" aria-hidden />
          {label}
          <span className="ml-auto rounded-full bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold text-brand">PRO</span>
        </a>
      ))}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-2 pt-1">
        <Logo />
      </div>
      <NavLinks onNavigate={onNavigate} />
      <a href={PRO_URL} target="_blank" rel="noopener" className="mt-auto block rounded-xl border bg-surface-2 p-4 transition hover:border-brand">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="size-4 text-brand" aria-hidden />
          Get Pulse Pro
        </div>
        <p className="mt-1 text-xs text-muted">Customers table, revenue analytics, settings and auth pages.</p>
      </a>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r bg-surface lg:block">
      <SidebarInner />
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      <div
        className={cn("absolute inset-0 bg-black/40 transition-opacity", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          "absolute inset-y-0 left-0 w-72 border-r bg-surface shadow-xl transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg hover:bg-surface-2"
          aria-label="Close navigation"
          tabIndex={open ? 0 : -1}
        >
          <X className="size-4" />
        </button>
        {open && <SidebarInner onNavigate={onClose} />}
      </aside>
    </div>
  );
}
