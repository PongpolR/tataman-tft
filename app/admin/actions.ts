"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { formDataToPostPayload, POSTS_TAG } from "@/lib/posts";
import { createClient } from "@/lib/supabase/server";
import type { PostFormData } from "@/types/post";

function revalidatePosts(slug?: string) {
  revalidateTag(POSTS_TAG);
  if (slug) revalidateTag(`post-${slug}`);
}

export async function createPostAction(data: PostFormData) {
  const supabase = await createClient();
  const payload = formDataToPostPayload(data);

  const { data: post, error } = await supabase
    .from("posts")
    .insert(payload)
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePosts();
  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect(`/admin/posts/${post.id}/edit`);
}

export async function updatePostAction(id: string, data: PostFormData) {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("posts")
    .select("published_at")
    .eq("id", id)
    .single();

  const payload = formDataToPostPayload(data);
  if (data.status === "published" && existing?.published_at) {
    payload.published_at = existing.published_at;
  }

  const { error } = await supabase.from("posts").update(payload).eq("id", id);

  if (error) return { error: error.message };

  revalidatePosts(data.slug);
  revalidatePath("/blog");
  revalidatePath(`/post/${data.slug}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function deletePostAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePosts();
  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { error: "No file provided" };
  }

  const supabase = await createClient();
  const ext = file.name.split(".").pop() ?? "png";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("post-images")
    .upload(fileName, file, { upsert: false });

  if (error) return { error: error.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("post-images").getPublicUrl(fileName);

  return { url: publicUrl };
}
