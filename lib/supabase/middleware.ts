import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/auth";

export const GUEST_COOKIE = "guest";

function isGuestAllowedRoute(pathname: string): boolean {
  return (
    pathname === "/blog" ||
    pathname === "/about" ||
    pathname === "/resource" ||
    pathname.startsWith("/post/")
  );
}

function isBlogManageRoute(pathname: string): boolean {
  return pathname.startsWith("/blog/manage");
}

function isBlogProfileRoute(pathname: string): boolean {
  return pathname === "/blog/profile";
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isGuest = request.cookies.get(GUEST_COOKIE)?.value === "1";
  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isLegacyAdminRoute = pathname.startsWith("/admin");

  if (pathname === "/") {
    return redirectTo(request, "/login");
  }

  if (isLegacyAdminRoute) {
    const newPath = pathname.replace(/^\/admin/, "/blog/manage");
    return redirectTo(request, newPath);
  }

  if (pathname === "/admin/login") {
    return redirectTo(request, "/login");
  }

  if (isAuthRoute) {
    if (user) {
      const dest = isAdminEmail(user.email) ? "/blog/manage" : "/blog/profile";
      return redirectTo(request, dest);
    }
    if (isGuest) {
      return redirectTo(request, "/blog");
    }
    return supabaseResponse;
  }

  if (isBlogManageRoute(pathname)) {
    if (!user) {
      return redirectTo(request, "/login");
    }
    if (!isAdminEmail(user.email)) {
      return redirectTo(request, "/blog/profile");
    }
    return supabaseResponse;
  }

  if (isBlogProfileRoute(pathname)) {
    if (!user) {
      return redirectTo(request, "/login");
    }
    return supabaseResponse;
  }

  if (isGuestAllowedRoute(pathname)) {
    if (!user && !isGuest) {
      return redirectTo(request, "/login");
    }
    return supabaseResponse;
  }

  return supabaseResponse;
}
