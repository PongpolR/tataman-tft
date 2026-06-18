import { notFound } from "next/navigation";
import PostForm from "@/app/components/admin/PostForm";
import { getPostById } from "@/lib/posts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">แก้ไขโพสต์</h1>
      <p className="mb-6 text-sm text-muted">{post.title}</p>
      <PostForm post={post} />
    </div>
  );
}
