"use client";

import { useState } from "react";
import { uploadImageAction } from "@/app/blog/actions";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImageAction(formData);
    setUploading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.url) onChange(result.url);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/post1-1.png หรือ URL จาก Supabase Storage"
        className="input-field"
      />
      <div className="flex items-center gap-3">
        <label className="btn-secondary cursor-pointer text-xs">
          {uploading ? "กำลังอัปโหลด..." : "อัปโหลดรูป"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="preview" className="h-12 rounded border border-border" />
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
