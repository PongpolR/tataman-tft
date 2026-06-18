import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import HeaderAuth from "@/app/components/layout/HeaderAuth";
import HeaderAuthSkeleton from "@/app/components/layout/HeaderAuthSkeleton";
import ThemeToggle from "@/app/components/layout/ThemeToggle";

const navLinks = [
  { href: "/resource", label: "Resource" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="site-container flex h-14 items-center justify-between sm:h-16">
        <Link href="/blog" className="group flex items-center gap-2 sm:gap-3">
          <Image
            src="/ttm.jpg"
            alt="Tataman"
            height={40}
            width={40}
            className="rounded-full ring-2 ring-accent/30 transition group-hover:ring-accent/60 sm:h-12 sm:w-12"
          />
          <div>
            <div className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Tataman
            </div>
            <div className="text-xs text-muted">TFT Player</div>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden items-center gap-1 md:flex md:gap-2">
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
          </nav>

          <Suspense fallback={<HeaderAuthSkeleton />}>
            <HeaderAuth />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
