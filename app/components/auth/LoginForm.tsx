"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { guestAction, loginAction } from "@/app/auth/actions";
import LoadingButton from "@/app/components/ui/LoadingButton";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleGuest() {
    setGuestLoading(true);
    setError(null);
    await guestAction();
  }

  return (
    <div className="relative w-full max-w-lg">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accent-muted/20" />

      <div className="card-surface-static animate-fade-in-up relative space-y-6 rounded-2xl p-8 shadow-xl shadow-black/10 dark:shadow-black/20 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/ttm.jpg"
            alt="Tataman"
            width={64}
            height={64}
            className="mb-4 rounded-full ring-2 ring-accent/40"
          />
          <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-sm text-muted">
            ยินดีต้อนรับสู่ Tataman TFT Blog
          </p>
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="input-field py-2.5"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="input-field py-2.5"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <LoadingButton
            type="submit"
            loading={loading}
            loadingText="กำลังเข้าสู่ระบบ..."
            className="w-full py-2.5 text-base"
          >
            เข้าสู่ระบบ
          </LoadingButton>
        </form>

        <p className="text-center text-sm text-muted">
          ยังไม่มีบัญชี?{" "}
          <Link href="/register" className="font-medium text-accent hover:underline">
            สมัครสมาชิก
          </Link>
        </p>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[var(--card)] px-3 text-muted">หรือ</span>
          </div>
        </div>

        <LoadingButton
          type="button"
          variant="secondary"
          loading={guestLoading}
          loadingText="กำลังเข้าใช้งาน..."
          onClick={handleGuest}
          className="w-full py-2.5"
        >
          เข้าใช้งานแบบ Guest
        </LoadingButton>
      </div>
    </div>
  );
}
