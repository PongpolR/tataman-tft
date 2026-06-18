"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logoutAction } from "@/app/auth/actions";

interface UserMenuProps {
  displayName: string;
  avatarUrl: string | null;
  isAdmin: boolean;
}

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[10rem] rounded-lg border border-border bg-card py-1 shadow-lg">
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
          <form action={logoutAction}>
            <button
              type="submit"
              className="block w-full px-4 py-2 text-left text-sm text-muted transition hover:bg-card-hover hover:text-foreground"
            >
              ออกจากระบบ
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
