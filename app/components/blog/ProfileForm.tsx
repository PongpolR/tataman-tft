"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import {
  updateProfileAction,
  uploadAvatarAction,
} from "@/app/blog/actions";
import LoadingButton from "@/app/components/ui/LoadingButton";
import Spinner from "@/app/components/ui/Spinner";
import type { Profile } from "@/types/profile";

interface ProfileFormProps {
  profile: Profile;
  isAdmin: boolean;
}

function AvatarFallback({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 text-2xl font-semibold text-accent">
      {initial}
    </span>
  );
}

export default function ProfileForm({ profile, isAdmin }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile.display_name);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadAvatarAction(formData);
    setIsUploading(false);

    if (result.error) {
      setUploadError(result.error);
      return;
    }

    if (result.url) {
      setAvatarUrl(result.url);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    formData.set("avatar_url", avatarUrl);

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
    <form onSubmit={handleSubmit} className="card-surface-static space-y-4 p-6">
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
        <label className="mb-2 block text-sm font-medium">รูปโปรไฟล์</label>
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={displayName}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-accent/30"
            />
          ) : (
            <AvatarFallback name={displayName} />
          )}
          <div>
            <label className="btn-secondary inline-flex cursor-pointer items-center gap-2 text-xs">
              {isUploading && <Spinner size="sm" />}
              {isUploading ? "กำลังอัปโหลด..." : "เลือกรูป"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploading || isPending}
                onChange={handleAvatarChange}
              />
            </label>
            <p className="mt-1 text-xs text-muted">JPG, PNG ขนาดไม่เกิน 2MB</p>
          </div>
        </div>
        {uploadError && (
          <p className="mt-1 text-xs text-red-400">{uploadError}</p>
        )}
      </div>

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
        <p className="text-sm text-muted">{isAdmin ? "Admin" : "User"}</p>
      </div>

      <LoadingButton type="submit" loading={isPending} loadingText="กำลังบันทึก...">
        บันทึกโปรไฟล์
      </LoadingButton>
    </form>
  );
}
