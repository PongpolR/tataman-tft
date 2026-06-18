"use client";

import Link from "next/link";
import { useState } from "react";
import { guestAction, loginAction } from "@/app/auth/actions";

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
    <div className="card-surface mx-auto max-w-md space-y-4 p-8">
      <h1 className="text-center text-xl font-bold">เข้าสู่ระบบ</h1>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="input-field"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="input-field"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>

      <p className="text-center text-sm text-muted">
        ยังไม่มีบัญชี?{" "}
        <Link href="/register" className="text-accent hover:underline">
          สมัครสมาชิก
        </Link>
      </p>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted">หรือ</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGuest}
        disabled={guestLoading}
        className="btn-secondary w-full"
      >
        {guestLoading ? "กำลังเข้าใช้งาน..." : "เข้าใช้งานแบบ Guest"}
      </button>
    </div>
  );
}
