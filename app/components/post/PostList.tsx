"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import FeaturedPostCard from "./FeaturedPostCard";
import type { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
}

const ITEMS_PER_PAGE = 5;

export default function PostList({ posts }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const featuredPost = posts[0] ?? null;
  const remainingPosts = posts.slice(1);
  const totalPages = Math.ceil(remainingPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = remainingPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (posts.length === 0) {
    return (
      <div className="gradient-border-wrap">
        <div className="card-surface-static relative rounded-2xl p-10 text-center shadow-lg shadow-black/5">
          <p className="mb-2 font-display text-lg font-semibold text-foreground">
            ยังไม่มีโพสต์
          </p>
          <p className="text-sm text-muted">กลับมาใหม่เร็วๆ นี้</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {featuredPost && currentPage === 1 && (
        <FeaturedPostCard post={featuredPost} />
      )}

      {remainingPosts.length > 0 && (
        <div className="grid gap-4 md:gap-5">
          {currentPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                currentPage === page
                  ? "bg-accent text-[var(--on-accent)]"
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
