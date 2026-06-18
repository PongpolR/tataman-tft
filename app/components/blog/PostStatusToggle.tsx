"use client";

import { useTransition } from "react";
import { togglePostStatusAction } from "@/app/blog/actions";
import type { PostStatus } from "@/types/post";

interface PostStatusToggleProps {
  postId: string;
  status: PostStatus;
}

export default function PostStatusToggle({
  postId,
  status,
}: PostStatusToggleProps) {
  const [isPending, startTransition] = useTransition();
  const isPublished = status === "published";

  function toggle() {
    startTransition(async () => {
      await togglePostStatusAction(
        postId,
        isPublished ? "draft" : "published"
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
        isPublished
          ? "bg-green-500/15 text-green-400 hover:bg-green-500/25"
          : "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25"
      } disabled:opacity-50`}
      title={isPublished ? "คลิกเพื่อซ่อนโพสต์" : "คลิกเพื่อเผยแพร่"}
    >
      {isPending
        ? "..."
        : isPublished
          ? "Published"
          : "Hidden"}
    </button>
  );
}
