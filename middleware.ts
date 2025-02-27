import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home", "/input", "/history"];
const publicRoutes = ["/auth"]; // "/"
const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;

  const isAuth = !!accessToken;
  console.log("isAuth", isAuth);

  // no login: protected -> public
  if (!isAuth && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }
  // login: public -> protected
  if (
    isAuth &&
    (publicRoutes.includes(request.nextUrl.pathname) ||
      request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/home", request.nextUrl.origin));
  }

  return NextResponse.next();
};

// 특정 경로에서만 middleware 실행
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default middleware;
