"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { addCommentAction, deleteCommentAction } from "@/app/blog/actions";
import LoadingButton from "@/app/components/ui/LoadingButton";
import TrashIcon from "@/app/components/ui/TrashIcon";
import UserAvatar from "@/app/components/ui/UserAvatar";
import { formatDateTime } from "@/lib/utils";
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
  const formRef = useRef<HTMLFormElement>(null);

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

  function handleTextareaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!content.trim() || isPending) return;
      formRef.current?.requestSubmit();
    }
  }

  return (
    <section className="animate-fade-in-up mt-12 border-t border-border pt-8">
      <h2 className="mb-6 text-xl font-bold">
        ความคิดเห็น ({comments.length})
      </h2>

      {isLoggedIn ? (
        <form ref={formRef} onSubmit={handleSubmit} className="mb-8 space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
            placeholder="เขียนความคิดเห็น..."
            rows={3}
            maxLength={2000}
            className="input-field resize-y"
            required
          />
          {message && <p className="text-sm text-muted">{message}</p>}
          <LoadingButton
            type="submit"
            loading={isPending}
            loadingText="กำลังส่ง..."
            disabled={!content.trim()}
          >
            ส่งความคิดเห็น
          </LoadingButton>
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
          comments.map((comment) => {
            const displayName = comment.author?.display_name ?? "ผู้ใช้";
            return (
            <article
              key={comment.id}
              className="rounded-lg border border-border bg-card/50 px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <UserAvatar
                  name={displayName}
                  avatarUrl={comment.author?.avatar_url ?? null}
                />
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="font-medium">{displayName}</span>
                      <span className="text-xs text-muted">
                        {formatDateTime(comment.created_at)}
                      </span>
                    </div>
                    {currentUserId === comment.user_id && (
                      <button
                        type="button"
                        onClick={() => handleDelete(comment.id)}
                        disabled={isPending}
                        aria-label="ลบความคิดเห็น"
                        className="self-start rounded-md p-1.5 text-red-400 transition hover:bg-red-500/10 hover:text-red-300 sm:self-center"
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </article>
            );
          })
        )}
      </div>
    </section>
  );
}
