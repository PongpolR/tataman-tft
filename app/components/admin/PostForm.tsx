"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import ImageUpload from "./ImageUpload";
import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from "@/app/blog/actions";
import LoadingButton from "@/app/components/ui/LoadingButton";
import { slugify } from "@/lib/utils";
import type { Post, PostFormData, PostStatus } from "@/types/post";

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

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="card-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-medium transition hover:bg-card-hover"
      >
        {title}
        <span className="text-muted">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-border px-5 py-4">
          {children}
        </div>
      )}
    </div>
  );
}

function ParagraphEditor({
  label,
  hint,
  values,
  onChange,
}: {
  label: string;
  hint?: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const text = values.filter(Boolean).join("\n\n");

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {hint && <p className="mb-2 text-xs text-muted">{hint}</p>}
      <textarea
        value={text}
        onChange={(e) => {
          const paragraphs = e.target.value
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean);
          onChange(paragraphs.length ? paragraphs : [""]);
        }}
        rows={6}
        className="input-field resize-y"
        placeholder="แยกย่อหน้าด้วยบรรทัดว่าง"
      />
    </div>
  );
}

function LineListEditor({
  label,
  hint,
  values,
  onChange,
}: {
  label: string;
  hint?: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const text = values.filter(Boolean).join("\n");

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {hint && <p className="mb-2 text-xs text-muted">{hint}</p>}
      <textarea
        value={text}
        onChange={(e) => {
          const lines = e.target.value
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
          onChange(lines.length ? lines : [""]);
        }}
        rows={4}
        className="input-field resize-y"
        placeholder="หนึ่งบรรทัดต่อหนึ่งรายการ"
      />
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

  function submit(status: PostStatus) {
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
        setForm((prev) => ({ ...prev, status }));
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

  const isPublished = form.status === "published";

  return (
    <div className="mx-auto max-w-3xl space-y-4">
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

      <div className="card-surface space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">ข้อมูลหลัก</h2>
          <button
            type="button"
            onClick={() =>
              updateField("status", isPublished ? "draft" : "published")
            }
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isPublished
                ? "bg-green-500/15 text-green-400"
                : "bg-yellow-500/15 text-yellow-400"
            }`}
          >
            {isPublished ? "Published" : "Hidden (Draft)"}
          </button>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">หัวข้อ</label>
          <input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Slug (URL)</label>
            <input
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">คำอธิบายสั้น</label>
            <input
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="input-field"
              required
            />
          </div>
        </div>

        <ParagraphEditor
          label="เนื้อหาหลัก"
          hint="แยกย่อหน้าด้วยบรรทัดว่าง"
          values={form.body}
          onChange={(v) => updateField("body", v)}
        />
      </div>

      <CollapsibleSection title="รูปภาพ">
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
      </CollapsibleSection>

      <CollapsibleSection title="เนื้อหาเพิ่มเติม">
        <div>
          <label className="mb-1 block text-sm font-medium">
            หัวข้อคำศัพท์ (Glossary)
          </label>
          <input
            value={form.header}
            onChange={(e) => updateField("header", e.target.value)}
            className="input-field"
            placeholder="เว้นว่างได้ถ้าไม่มี"
          />
        </div>
        <LineListEditor
          label="รายการคำศัพท์"
          values={form.header_desc}
          onChange={(v) => updateField("header_desc", v)}
        />
        <ParagraphEditor
          label="เนื้อหาส่วนที่ 2"
          values={form.body2}
          onChange={(v) => updateField("body2", v)}
        />
        <LineListEditor
          label="สรุป"
          values={form.summary}
          onChange={(v) => updateField("summary", v)}
        />
        <LineListEditor
          label="อ้างอิง (URL)"
          hint="หนึ่ง URL ต่อบรรทัด"
          values={form.ref}
          onChange={(v) => updateField("ref", v)}
        />
      </CollapsibleSection>

      <div className="flex flex-wrap gap-3 pt-2">
        <LoadingButton
          type="button"
          variant="secondary"
          loading={isPending}
          loadingText="กำลังบันทึก..."
          onClick={() => submit("draft")}
        >
          บันทึก (ซ่อน)
        </LoadingButton>
        <LoadingButton
          type="button"
          loading={isPending}
          loadingText="กำลังบันทึก..."
          onClick={() => submit("published")}
        >
          บันทึก & เผยแพร่
        </LoadingButton>
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
        <Link href="/blog/manage" className="btn-secondary ml-auto">
          กลับ
        </Link>
      </div>
    </div>
  );
}
