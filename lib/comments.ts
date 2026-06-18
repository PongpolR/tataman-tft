import { createClient } from "@/lib/supabase/server";
import type { Comment } from "@/types/comment";

function mapComment(
  row: Record<string, unknown>,
  profile?: {
    display_name: string;
    email: string;
    avatar_url: string | null;
  } | null
): Comment {
  return {
    id: row.id as string,
    post_id: row.post_id as string,
    user_id: row.user_id as string,
    content: row.content as string,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    author: profile
      ? {
          display_name: profile.display_name || profile.email.split("@")[0],
          email: profile.email,
          avatar_url: profile.avatar_url,
        }
      : undefined,
  };
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getCommentsByPostId:", error.message);
    return [];
  }

  if (!data?.length) return [];

  const userIds = [...new Set(data.map((c) => c.user_id as string))];
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, display_name, email, avatar_url")
    .in("id", userIds);

  if (profileError) {
    console.error("getCommentsByPostId profiles:", profileError.message);
  }

  const profileMap = new Map(
    (profiles ?? []).map((p) => [
      p.id as string,
      p as { display_name: string; email: string; avatar_url: string | null },
    ])
  );

  return data.map((row) =>
    mapComment(row, profileMap.get(row.user_id as string))
  );
}
