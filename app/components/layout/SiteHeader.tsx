"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import HeaderAuth from "@/app/components/layout/HeaderAuth";
import HeaderAuthSkeleton from "@/app/components/layout/HeaderAuthSkeleton";
import SiteNav, { useHeaderScroll } from "@/app/components/layout/SiteNav";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const scrolled = useHeaderScroll();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md transition-shadow duration-200",
        scrolled && "shadow-sm shadow-black/5"
      )}
    >
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
            <div className="font-display text-base font-bold tracking-wide text-foreground sm:text-lg">
              Tataman
            </div>
            <div className="text-xs text-muted">TFT Player</div>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <SiteNav />
          <Suspense fallback={<HeaderAuthSkeleton />}>
            <HeaderAuth />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
