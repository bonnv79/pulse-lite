"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileSidebar } from "@/components/sidebar";

export function Topbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-surface/85 px-4 backdrop-blur sm:px-6">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>

        <form role="search" className="relative max-w-sm flex-1" onSubmit={(e) => e.preventDefault()}>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            placeholder="Search customers, invoices…"
            aria-label="Search"
            className="h-9 w-full rounded-lg border bg-surface-2 pr-3 pl-9 text-sm placeholder:text-muted/80 focus:border-brand focus:bg-surface focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface" />
          </Button>
          <span className="ml-2 grid size-9 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand" aria-hidden>
            JD
          </span>
        </div>
      </header>
      <MobileSidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
