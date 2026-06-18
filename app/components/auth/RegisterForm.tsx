"use client";

import Link from "next/link";
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
    <form
      onSubmit={handleSubmit}
      className="card-surface mx-auto max-w-md space-y-4 p-8"
    >
      <h1 className="text-center text-xl font-bold">สมัครสมาชิก</h1>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
          {success}
        </p>
      )}

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
          minLength={6}
          className="input-field"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          ยืนยัน Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={6}
          className="input-field"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
      </button>

      <p className="text-center text-sm text-muted">
        มีบัญชีแล้ว?{" "}
        <Link href="/login" className="text-accent hover:underline">
          เข้าสู่ระบบ
        </Link>
      </p>
    </form>
  );
}
