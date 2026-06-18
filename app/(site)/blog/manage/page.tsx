import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import PostStatusToggle from "@/app/components/blog/PostStatusToggle";

export default async function BlogManagePage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">จัดการโพสต์</h1>
          <p className="mt-1 text-sm text-muted">
            สร้าง แก้ไข และเลือกซ่อนหรือเผยแพร่โพสต์
          </p>
        </div>
        <Link href="/blog/manage/posts/new" className="btn-primary">
          + สร้างโพสต์ใหม่
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card-surface p-8 text-center text-muted">
          ยังไม่มีโพสต์ —{" "}
          <Link
            href="/blog/manage/posts/new"
            className="text-accent hover:underline"
          >
            สร้างโพสต์แรก
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="card-surface flex flex-wrap items-center justify-between gap-4 p-4"
            >
              <Link
                href={`/blog/manage/posts/${post.id}/edit`}
                className="min-w-0 flex-1 hover:opacity-90"
              >
                <p className="truncate font-medium">{post.title}</p>
                <p className="text-xs text-muted">
                  /post/{post.slug} ·{" "}
                  {formatDate(post.published_at || post.updated_at)}
                </p>
              </Link>
              <PostStatusToggle postId={post.id} status={post.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
