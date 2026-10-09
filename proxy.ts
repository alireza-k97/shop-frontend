import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      return NextResponse.next();
    }

    const result = await response.json();

    if (!result.authorized) {
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      return NextResponse.next();
    }

    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
