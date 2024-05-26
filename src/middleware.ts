import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const session = cookies().get("auth_session");

  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/profile/:path*"],
};
