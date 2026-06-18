"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "@/app/components/auth/LogoutButton";

interface UserMenuProps {
  displayName: string;
  avatarUrl: string | null;
  isAdmin: boolean;
}

const CLOSE_DELAY_MS = 200;

function AvatarFallback({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
      {initial}
    </span>
  );
}

export default function UserMenu({
  displayName,
  avatarUrl,
  isAdmin,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }

  function handleMouseEnter() {
    clearCloseTimer();
    setOpen(true);
  }

  function handleMouseLeave() {
    scheduleClose();
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearCloseTimer();
    };
  }, []);

  function close() {
    clearCloseTimer();
    setOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="เมนูโปรไฟล์"
        aria-expanded={open}
        className="rounded-full ring-2 ring-transparent transition hover:ring-accent/40 focus:outline-none focus:ring-accent/40"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <AvatarFallback name={displayName} />
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 pt-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="min-w-[11rem] overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg">
            <Link
              href="/blog/profile"
              onClick={close}
              className="block px-4 py-2 text-sm text-foreground transition hover:bg-card-hover"
            >
              โปรไฟล์
            </Link>
            {isAdmin && (
              <Link
                href="/blog/manage"
                onClick={close}
                className="block px-4 py-2 text-sm text-foreground transition hover:bg-card-hover"
              >
                จัดการโพสต์
              </Link>
            )}
            <div className="mt-1 border-t border-border px-2 pb-1 pt-1">
              <LogoutButton className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/20 disabled:opacity-70" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
