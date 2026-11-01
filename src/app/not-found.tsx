import Link from "next/link";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <div>
        <p className="text-sm font-semibold text-brand">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 text-muted">The page you are looking for does not exist or was moved.</p>
        <Link href="/" className={buttonClass("primary") + " mt-6"}>
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
