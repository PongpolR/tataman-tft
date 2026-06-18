"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileNav from "@/app/components/layout/MobileNav";
import UserMenu from "@/app/components/layout/UserMenu";
import HeaderAuthSkeleton from "@/app/components/layout/HeaderAuthSkeleton";
import { isAdminEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/client";

interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  displayName: string;
  avatarUrl: string | null;
}

const loggedOutState: AuthState = {
  loading: false,
  isLoggedIn: false,
  isAdmin: false,
  displayName: "",
  avatarUrl: null,
};

export default function HeaderAuth() {
  const [auth, setAuth] = useState<AuthState>({ ...loggedOutState, loading: true });

  useEffect(() => {
    const supabase = createClient();

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user ?? null;

      if (!user) {
        setAuth(loggedOutState);
        return;
      }

      const isAdmin = isAdminEmail(user.email);
      let displayName = user.email?.split("@")[0] ?? "User";
      let avatarUrl: string | null = null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name,avatar_url,email")
        .eq("id", user.id)
        .single();

      if (profile) {
        displayName = profile.display_name || profile.email.split("@")[0];
        avatarUrl = profile.avatar_url;
      }

      setAuth({
        loading: false,
        isLoggedIn: true,
        isAdmin,
        displayName,
        avatarUrl,
      });
    }

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (auth.loading) {
    return (
      <>
        <HeaderAuthSkeleton />
        <MobileNav isLoggedIn={false} isAdmin={false} />
      </>
    );
  }

  return (
    <>
      {auth.isLoggedIn ? (
        auth.isAdmin && (
          <Link
            href="/blog/manage"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground md:block"
          >
            จัดการโพสต์
          </Link>
        )
      ) : (
        <Link
          href="/login"
          className="hidden rounded-lg px-3 py-2 text-sm font-medium text-accent transition hover:bg-card md:block"
        >
          เข้าสู่ระบบ
        </Link>
      )}

      {auth.isLoggedIn && (
        <UserMenu
          displayName={auth.displayName}
          avatarUrl={auth.avatarUrl}
          isAdmin={auth.isAdmin}
        />
      )}

      <MobileNav isLoggedIn={auth.isLoggedIn} isAdmin={auth.isAdmin} />
    </>
  );
}
