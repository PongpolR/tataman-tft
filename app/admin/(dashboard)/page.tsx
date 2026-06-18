import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">โพสต์ทั้งหมด</h1>
        <Link href="/admin/posts/new" className="btn-primary">
          + สร้างโพสต์ใหม่
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card-surface p-8 text-center text-muted">
          ยังไม่มีโพสต์ —{" "}
          <Link href="/admin/posts/new" className="text-accent hover:underline">
            สร้างโพสต์แรก
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}/edit`}
              className="card-surface-interactive flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{post.title}</p>
                <p className="text-xs text-muted">
                  /post/{post.slug} ·{" "}
                  {formatDate(post.published_at || post.updated_at)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  post.status === "published"
                    ? "bg-green-500/15 text-green-400"
                    : "bg-yellow-500/15 text-yellow-400"
                }`}
              >
                {post.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
