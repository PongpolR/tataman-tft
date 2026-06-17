"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import type { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
}

const ITEMS_PER_PAGE = 5;

export default function PostList({ posts }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (posts.length === 0) {
    return (
      <div className="card-surface p-8 text-center text-muted">
        ยังไม่มีโพสต์ — กลับมาใหม่เร็วๆ นี้
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4">
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                currentPage === page
                  ? "bg-accent text-[#0f1117]"
                  : "bg-card text-muted hover:bg-card-hover hover:text-foreground"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
