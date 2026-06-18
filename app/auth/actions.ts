"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profiles";
import { GUEST_COOKIE } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

const GUEST_MAX_AGE = 60 * 60 * 24 * 30;

function redirectAfterLogin(email: string | undefined) {
  if (isAdminEmail(email)) {
    redirect("/blog/manage");
  }
  redirect("/blog/profile");
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await getOrCreateProfile(user.id, user.email ?? email);
  }

  const cookieStore = await cookies();
  cookieStore.delete(GUEST_COOKIE);

  redirectAfterLogin(email);
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { error: "รหัสผ่านไม่ตรงกัน" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    const cookieStore = await cookies();
    cookieStore.delete(GUEST_COOKIE);
    if (data.user) {
      await getOrCreateProfile(data.user.id, data.user.email ?? email);
    }
    redirectAfterLogin(email);
  }

  return {
    success:
      "สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี (ถ้ามีการเปิดใช้งาน email confirmation)",
  };
}

export async function guestAction() {
  const cookieStore = await cookies();
  cookieStore.set(GUEST_COOKIE, "1", {
    httpOnly: true,
    path: "/",
    maxAge: GUEST_MAX_AGE,
    sameSite: "lax",
  });

  redirect("/blog");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete(GUEST_COOKIE);

  redirect("/login");
}
