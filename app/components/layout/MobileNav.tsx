"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/app/components/layout/ThemeToggle";

interface MobileNavProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const navLinks = [
  { href: "/resource", label: "Resource" },
  { href: "/about", label: "About" },
];

export default function MobileNav({ isLoggedIn, isAdmin }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
        aria-expanded={open}
        className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-foreground"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="ปิดเมนู"
            className="fixed inset-0 z-40 bg-black/50"
            onClick={close}
          />
          <nav className="fixed inset-x-0 top-14 z-50 border-b border-border bg-background sm:top-16">
            <div className="site-container flex flex-col gap-1 py-3">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-muted">ธีม</span>
                <ThemeToggle />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && isAdmin && (
                <Link
                  href="/blog/manage"
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
                >
                  จัดการโพสต์
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-accent transition hover:bg-card"
                >
                  เข้าสู่ระบบ
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
