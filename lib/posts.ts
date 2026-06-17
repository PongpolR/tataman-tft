import { createClient } from "@/lib/supabase/server";
import type { Post, PostFormData } from "@/types/post";

function mapPost(row: Record<string, unknown>): Post {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    description: row.description as string,
    status: row.status as Post["status"],
    published_at: (row.published_at as string) ?? null,
    header: (row.header as string) ?? "",
    header_desc: (row.header_desc as string[]) ?? [],
    body: (row.body as string[]) ?? [],
    img: (row.img as string) ?? null,
    img_desc: (row.img_desc as string) ?? "",
    body2: (row.body2 as string[]) ?? [],
    img2: (row.img2 as string) ?? null,
    img2_desc: (row.img2_desc as string) ?? "",
    summary: (row.summary as string[]) ?? [],
    ref: (row.ref as string[]) ?? [],
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getPublishedPosts:", error.message);
    return [];
  }

  return (data ?? []).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return mapPost(data);
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("getAllPosts:", error.message);
    return [];
  }

  return (data ?? []).map(mapPost);
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapPost(data);
}

export function formDataToPostPayload(data: PostFormData) {
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    status: data.status,
    published_at:
      data.status === "published" ? new Date().toISOString() : null,
    header: data.header,
    header_desc: data.header_desc.filter(Boolean),
    body: data.body.filter(Boolean),
    img: data.img || null,
    img_desc: data.img_desc,
    body2: data.body2.filter(Boolean),
    img2: data.img2 || null,
    img2_desc: data.img2_desc,
    summary: data.summary.filter(Boolean),
    ref: data.ref.filter(Boolean),
    updated_at: new Date().toISOString(),
  };
}
