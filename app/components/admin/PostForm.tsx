"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import ImageUpload from "./ImageUpload";
import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from "@/app/admin/actions";
import { slugify } from "@/lib/utils";
import type { Post, PostFormData } from "@/types/post";

interface PostFormProps {
  post?: Post;
}

function emptyForm(): PostFormData {
  return {
    slug: "",
    title: "",
    description: "",
    status: "draft",
    header: "",
    header_desc: [""],
    body: [""],
    img: "",
    img_desc: "",
    body2: [""],
    img2: "",
    img2_desc: "",
    summary: [""],
    ref: [""],
  };
}

function postToForm(post: Post): PostFormData {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    status: post.status,
    header: post.header,
    header_desc: post.header_desc.length ? post.header_desc : [""],
    body: post.body.length ? post.body : [""],
    img: post.img ?? "",
    img_desc: post.img_desc,
    body2: post.body2.length ? post.body2 : [""],
    img2: post.img2 ?? "",
    img2_desc: post.img2_desc,
    summary: post.summary.length ? post.summary : [""],
    ref: post.ref.length ? post.ref : [""],
  };
}

function StringListEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {values.map((value, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            value={value}
            onChange={(e) => {
              const next = [...values];
              next[i] = e.target.value;
              onChange(next);
            }}
            rows={2}
            className="input-field flex-1"
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            className="btn-secondary shrink-0 px-2 text-xs"
          >
            ลบ
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="btn-secondary text-xs"
      >
        + เพิ่มบรรทัด
      </button>
    </div>
  );
}

export default function PostForm({ post }: PostFormProps) {
  const [form, setForm] = useState<PostFormData>(
    post ? postToForm(post) : emptyForm()
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof PostFormData>(
    key: K,
    value: PostFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: post ? prev.slug : slugify(title),
    }));
  }

  function submit(status: "draft" | "published") {
    const payload = { ...form, status };
    setMessage(null);

    startTransition(async () => {
      const result = post
        ? await updatePostAction(post.id, payload)
        : await createPostAction(payload);

      if (result && "error" in result && result.error) {
        setMessage(result.error);
      } else if (result && "success" in result) {
        setMessage("บันทึกสำเร็จ");
      }
    });
  }

  function handleDelete() {
    if (!post) return;
    if (!confirm("ลบโพสต์นี้?")) return;

    startTransition(async () => {
      await deletePostAction(post.id);
    });
  }

  return (
    <div className="space-y-6">
      {message && (
        <p
          className={`rounded-lg px-4 py-2 text-sm ${
            message.includes("สำเร็จ")
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <input
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Header (คำศัพท์ที่เกี่ยวข้อง)
        </label>
        <input
          value={form.header}
          onChange={(e) => updateField("header", e.target.value)}
          className="input-field"
          placeholder="เว้นว่างได้ถ้าไม่มี"
        />
      </div>

      <StringListEditor
        label="Glossary items"
        values={form.header_desc}
        onChange={(v) => updateField("header_desc", v)}
      />

      <StringListEditor
        label="Body paragraphs"
        values={form.body}
        onChange={(v) => updateField("body", v)}
      />

      <ImageUpload
        label="รูปที่ 1"
        value={form.img}
        onChange={(v) => updateField("img", v)}
      />

      <div>
        <label className="mb-1 block text-sm font-medium">คำอธิบายรูปที่ 1</label>
        <input
          value={form.img_desc}
          onChange={(e) => updateField("img_desc", e.target.value)}
          className="input-field"
        />
      </div>

      <StringListEditor
        label="Body 2 paragraphs"
        values={form.body2}
        onChange={(v) => updateField("body2", v)}
      />

      <ImageUpload
        label="รูปที่ 2"
        value={form.img2}
        onChange={(v) => updateField("img2", v)}
      />

      <div>
        <label className="mb-1 block text-sm font-medium">คำอธิบายรูปที่ 2</label>
        <input
          value={form.img2_desc}
          onChange={(e) => updateField("img2_desc", e.target.value)}
          className="input-field"
        />
      </div>

      <StringListEditor
        label="Summary bullets"
        values={form.summary}
        onChange={(v) => updateField("summary", v)}
      />

      <StringListEditor
        label="References (URLs)"
        values={form.ref}
        onChange={(v) => updateField("ref", v)}
      />

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <button
          type="button"
          disabled={isPending}
          onClick={() => submit("draft")}
          className="btn-secondary"
        >
          บันทึก Draft
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => submit("published")}
          className="btn-primary"
        >
          Publish
        </button>
        {post && (
          <>
            <Link
              href={`/post/${post.slug}`}
              className="btn-secondary"
              target="_blank"
            >
              ดูหน้า public
            </Link>
            <button
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="btn-secondary text-red-400 hover:text-red-300"
            >
              ลบโพสต์
            </button>
          </>
        )}
        <Link href="/admin" className="btn-secondary ml-auto">
          กลับ
        </Link>
      </div>
    </div>
  );
}
