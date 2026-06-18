"use client";

import { useState, useTransition } from "react";
import { updateProfileAction } from "@/app/blog/actions";
import LoadingButton from "@/app/components/ui/LoadingButton";
import type { Profile } from "@/types/profile";

interface ProfileFormProps {
  profile: Profile;
  isAdmin: boolean;
}

export default function ProfileForm({ profile, isAdmin }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile.display_name);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (result?.error) {
        setMessage(result.error);
      } else {
        setMessage("บันทึกสำเร็จ");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6">
      {message && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            message.includes("สำเร็จ")
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">อีเมล</label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="input-field opacity-60"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">ชื่อที่แสดง</label>
        <input
          name="display_name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          className="input-field"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">บทบาท</label>
        <p className="text-sm text-muted">
          {isAdmin ? "Admin" : "User"}
        </p>
      </div>

      <LoadingButton type="submit" loading={isPending} loadingText="กำลังบันทึก...">
        บันทึกโปรไฟล์
      </LoadingButton>
    </form>
  );
}
