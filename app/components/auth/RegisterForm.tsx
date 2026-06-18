"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { registerAction } from "@/app/auth/actions";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setSuccess(result.success);
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-lg">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accent-muted/20" />

      <form
        onSubmit={handleSubmit}
        className="card-surface relative space-y-6 rounded-2xl p-8 shadow-xl shadow-black/20 sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/ttm.jpg"
            alt="Tataman"
            width={64}
            height={64}
            className="mb-4 rounded-full ring-2 ring-accent/40"
          />
          <h1 className="text-2xl font-bold">สมัครสมาชิก</h1>
          <p className="mt-1 text-sm text-muted">สร้างบัญชีเพื่อแสดงความคิดเห็น</p>
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </p>
        )}

        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="input-field py-2.5"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="input-field py-2.5"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              ยืนยัน Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              className="input-field py-2.5"
              autoComplete="new-password"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-base">
          {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>

        <p className="text-center text-sm text-muted">
          มีบัญชีแล้ว?{" "}
          <Link href="/login" className="font-medium text-accent hover:underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </form>
    </div>
  );
}
