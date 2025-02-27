"use client";

import { SessionProvider } from "next-auth/react";

const AuthSession = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider session={null}>{children}</SessionProvider>;
};
export default AuthSession;
