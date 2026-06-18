import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const GUEST_COOKIE = "guest";

function isGuestAllowedRoute(pathname: string): boolean {
  return (
    pathname === "/blog" ||
    pathname === "/about" ||
    pathname === "/resource" ||
    pathname.startsWith("/post/")
  );
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
  const isAdminRoute = pathname.startsWith("/admin");

  if (pathname === "/") {
    return redirectTo(request, "/login");
  }

  if (pathname === "/admin/login") {
    return redirectTo(request, "/login");
  }

  if (isAuthRoute) {
    if (user) {
      return redirectTo(request, "/admin");
    }
    if (isGuest) {
      return redirectTo(request, "/blog");
    }
    return supabaseResponse;
  }

  if (isAdminRoute) {
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
