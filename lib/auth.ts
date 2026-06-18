import { redirect } from "next/navigation";
import { cache } from "react";
import { isAdminUser } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export { ADMIN_EMAIL, isAdminEmail, isAdminUser } from "@/lib/admin";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (!isAdminUser(user)) redirect("/blog/profile");
  return user;
}
