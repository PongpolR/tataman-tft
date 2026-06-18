import type { User } from "@supabase/supabase-js";

export const ADMIN_EMAIL = "pongpol.yy55@gmail.com";

export function isAdminEmail(email: string | undefined | null): boolean {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export function isAdminUser(user: User | null | undefined): boolean {
  return isAdminEmail(user?.email);
}
