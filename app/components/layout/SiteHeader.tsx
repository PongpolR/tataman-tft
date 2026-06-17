import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/resource", label: "Resource" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="site-container flex items-center justify-between py-4">
        <Link href="/" className="group flex items-center gap-3">
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
