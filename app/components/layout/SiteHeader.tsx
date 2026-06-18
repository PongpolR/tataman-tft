import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/components/layout/ThemeToggle";
import { getCurrentUser, isAdminUser } from "@/lib/auth";

const navLinks = [
  { href: "/resource", label: "Resource" },
  { href: "/about", label: "About" },
];

export default async function SiteHeader() {
  const user = await getCurrentUser();
  const isAdmin = isAdminUser(user);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="site-container flex items-center justify-between py-4">
        <Link href="/blog" className="group flex items-center gap-3">
          <Image
            src="/ttm.jpg"
            alt="Tataman"
            height={48}
            width={48}
            className="rounded-full ring-2 ring-accent/30 transition group-hover:ring-accent/60"
          />
          <div>
            <div className="text-lg font-bold tracking-tight text-foreground">
              Tataman
            </div>
            <div className="text-xs text-muted">TFT Player</div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              {isAdmin && (
                <Link
                  href="/blog/manage"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
                >
                  จัดการโพสต์
                </Link>
              )}
              <Link
                href="/blog/profile"
                className="rounded-lg px-3 py-2 text-sm font-medium text-accent transition hover:bg-card"
              >
                โปรไฟล์
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-accent transition hover:bg-card"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
