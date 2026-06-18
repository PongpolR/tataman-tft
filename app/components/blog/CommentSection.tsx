"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { addCommentAction, deleteCommentAction } from "@/app/blog/actions";
import { formatDate } from "@/lib/utils";
import type { Comment } from "@/types/comment";

interface CommentSectionProps {
  postId: string;
  postSlug: string;
  comments: Comment[];
  currentUserId?: string;
  isLoggedIn: boolean;
}

export default function CommentSection({
  postId,
  postSlug,
  comments,
  currentUserId,
  isLoggedIn,
}: CommentSectionProps) {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content.trim()) return;
    setMessage(null);

    const formData = new FormData();
    formData.set("content", content);
    formData.set("slug", postSlug);

    startTransition(async () => {
      const result = await addCommentAction(postId, formData);
      if (result?.error) {
        setMessage(result.error);
      } else {
        setContent("");
        setMessage("ส่งความคิดเห็นแล้ว");
      }
    });
  }

  function handleDelete(commentId: string) {
    if (!confirm("ลบความคิดเห็นนี้?")) return;
    startTransition(async () => {
      await deleteCommentAction(commentId, postSlug);
    });
  }

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-6 text-xl font-bold">
        ความคิดเห็น ({comments.length})
      </h2>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mb-8 space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="เขียนความคิดเห็น..."
            rows={3}
            maxLength={2000}
            className="input-field resize-y"
            required
          />
          {message && <p className="text-sm text-muted">{message}</p>}
          <button
            type="submit"
            disabled={isPending || !content.trim()}
            className="btn-primary"
          >
            {isPending ? "กำลังส่ง..." : "ส่งความคิดเห็น"}
          </button>
        </form>
      ) : (
        <p className="mb-8 text-sm text-muted">
          <Link href="/login" className="text-accent hover:underline">
            เข้าสู่ระบบ
          </Link>{" "}
          เพื่อแสดงความคิดเห็น
        </p>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-muted">ยังไม่มีความคิดเห็น</p>
        ) : (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-lg border border-border bg-card/50 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                  <span className="font-medium">
                    {comment.author?.display_name ?? "ผู้ใช้"}
                  </span>
                  <span className="ml-2 text-xs text-muted">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                {currentUserId === comment.user_id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(comment.id)}
                    disabled={isPending}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    ลบ
                  </button>
                )}
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {comment.content}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
