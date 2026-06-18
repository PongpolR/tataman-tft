import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-lg font-bold text-accent">
              Tataman Admin
            </Link>
            <Link href="/blog" className="text-sm text-muted hover:text-foreground">
              ดูเว็บ
            </Link>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="btn-secondary text-xs">
              ออกจากระบบ
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
