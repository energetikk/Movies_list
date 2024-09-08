// export { auth as middleware } from "@/configs/auth";
// export const config = { matcher: ['/profile', '/films'] };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/configs/auth";

const protectedRoutes = ["/middleware", '/films', '/favorite', '/profile' ];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
