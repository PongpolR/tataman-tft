"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, requireUser } from "@/lib/auth";
import { formDataToPostPayload } from "@/lib/posts";
import { getOrCreateProfile } from "@/lib/profiles";
import { createClient } from "@/lib/supabase/server";
import type { PostFormData } from "@/types/post";

async function assertAdmin() {
  await requireAdmin();
}

export async function createPostAction(data: PostFormData) {
  await assertAdmin();
  const supabase = await createClient();
  const payload = formDataToPostPayload(data);

  const { data: post, error } = await supabase
    .from("posts")
    .insert(payload)
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/blog");
  revalidatePath("/blog/manage");
  redirect(`/blog/manage/posts/${post.id}/edit`);
}

export async function updatePostAction(id: string, data: PostFormData) {
  await assertAdmin();
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

  revalidatePath("/blog");
  revalidatePath(`/post/${data.slug}`);
  revalidatePath("/blog/manage");
  return { success: true };
}

export async function togglePostStatusAction(
  id: string,
  status: "draft" | "published"
) {
  await assertAdmin();
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("posts")
    .select("slug, published_at")
    .eq("id", id)
    .single();

  if (!existing) return { error: "ไม่พบโพสต์" };

  const { error } = await supabase
    .from("posts")
    .update({
      status,
      published_at:
        status === "published"
          ? existing.published_at ?? new Date().toISOString()
          : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/blog");
  revalidatePath(`/post/${existing.slug}`);
  revalidatePath("/blog/manage");
  return { success: true };
}

export async function deletePostAction(id: string) {
  await assertAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/blog");
  revalidatePath("/blog/manage");
  redirect("/blog/manage");
}

export async function uploadImageAction(formData: FormData) {
  await assertAdmin();
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

export async function updateProfileAction(formData: FormData) {
  const user = await requireUser();
  const displayName = (formData.get("display_name") as string)?.trim();

  if (!displayName) {
    return { error: "กรุณากรอกชื่อที่แสดง" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? "",
      display_name: displayName,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) return { error: error.message };

  revalidatePath("/blog/profile");
  return { success: true };
}

export async function addCommentAction(postId: string, formData: FormData) {
  const user = await requireUser();
  const content = (formData.get("content") as string)?.trim();

  if (!content) {
    return { error: "กรุณาเขียนความคิดเห็น" };
  }

  await getOrCreateProfile(user.id, user.email ?? "");

  const supabase = await createClient();
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: user.id,
    content,
  });

  if (error) return { error: error.message };

  revalidatePath(`/post/${formData.get("slug")}`);
  return { success: true };
}

export async function deleteCommentAction(
  commentId: string,
  slug: string
) {
  const user = await requireUser();
  const supabase = await createClient();

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath(`/post/${slug}`);
  return { success: true };
}
