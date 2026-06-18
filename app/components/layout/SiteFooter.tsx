import Link from "next/link";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/resource", label: "Resource" },
  { href: "/about", label: "About" },
];

const communityLinks = [
  { href: "/resource", label: "แหล่งเรียนรู้" },
  { href: "/about", label: "ประวัติ & ผลงาน" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />

      <div className="site-container py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display mb-2 text-base font-bold text-foreground">
              Tataman TFT
            </p>
            <p className="text-sm leading-relaxed text-muted">
              บล็อกแบ่งปันเทคนิค competitive, tips และ tournament recap
              สำหรับผู้เล่น TFT ทุกระดับ
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">เมนู</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              ชุมชน
            </p>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6 text-center text-xs text-muted">
          <p>© {year} Tataman TFT · SET 14 — Into the Arcane</p>
        </div>
      </div>
    </footer>
  );
}
