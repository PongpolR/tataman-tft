import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";
import { requireAdmin } from "@/lib/auth";

export default async function BlogManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="-mx-4 -mt-8 sm:-mx-6">
      <div className="border-b border-border bg-card/50">
        <div className="site-container flex flex-wrap items-center justify-between gap-3 py-4">
          <nav className="-mx-4 flex items-center gap-1 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:gap-2 sm:px-0 sm:overflow-visible">
            <Link
              href="/blog/manage"
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
            >
              จัดการโพสต์
            </Link>
            <Link
              href="/blog/profile"
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
            >
              โปรไฟล์
            </Link>
            <Link
              href="/blog"
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
            >
              ดูบล็อก
            </Link>
          </nav>
          <form action={logoutAction}>
            <button type="submit" className="btn-secondary text-xs">
              ออกจากระบบ
            </button>
          </form>
        </div>
      </div>
      <div className="site-container py-8">{children}</div>
    </div>
  );
}
