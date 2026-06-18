import CommentSectionSkeleton from "@/app/components/blog/CommentSectionSkeleton";
import PostContentSkeleton from "@/app/components/post/PostContentSkeleton";

export default function PostLoading() {
  return (
    <>
      <PostContentSkeleton />
      <CommentSectionSkeleton />
    </>
  );
}
