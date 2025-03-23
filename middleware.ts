import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const protectedRoutes = ["/home", "/input", "/history"];
const publicRoutes = ["/auth"]; // "/"
const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;

  let isAuth = false;
  if (!accessToken) {
    console.log("No access token found");
  } else {
    const tokenExp = jwtDecode<{ exp?: number }>(accessToken).exp ?? 0;
    isAuth = tokenExp > Date.now() / 1000;

    console.log(
      "Token Expiration:",
      tokenExp,
      "Current Time:",
      Date.now() / 1000
    );
  }
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
