import { notFound } from "next/navigation";
import CommentSection from "@/app/components/blog/CommentSection";
import PostContent from "@/app/components/post/PostContent";
import { getCurrentUser } from "@/lib/auth";
import { getCommentsByPostId } from "@/lib/comments";
import { getPostBySlug } from "@/lib/posts";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Tataman TFT`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const [user, comments] = await Promise.all([
    getCurrentUser(),
    getCommentsByPostId(post.id),
  ]);

  return (
    <>
      <PostContent post={post} />
      <CommentSection
        postId={post.id}
        postSlug={post.slug}
        comments={comments}
        currentUserId={user?.id}
        isLoggedIn={!!user}
      />
    </>
  );
}
