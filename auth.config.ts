import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: any) {
      const isAuthenticated = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith("/home");
      if (isOnHome) {
        if (isAuthenticated) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isAuthenticated) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
