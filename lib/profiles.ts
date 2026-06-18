import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";

function mapProfile(row: Record<string, unknown>): Profile {
  return {
    id: row.id as string,
    email: row.email as string,
    display_name: (row.display_name as string) ?? "",
    avatar_url: (row.avatar_url as string) ?? null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,display_name,avatar_url,created_at,updated_at")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return mapProfile(data);
}

export async function getOrCreateProfile(
  userId: string,
  email: string
): Promise<Profile> {
  const existing = await getProfile(userId);
  if (existing) return existing;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      email,
      display_name: email.split("@")[0],
    })
    .select("id,email,display_name,avatar_url,created_at,updated_at")
    .single();

  if (error || !data) {
    return {
      id: userId,
      email,
      display_name: email.split("@")[0],
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  return mapProfile(data);
}
