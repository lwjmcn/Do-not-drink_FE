import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import MainLayout from "@component/MainLayout";
import AuthSession from "./(auth)/_component/AuthSession";

export const metadata: Metadata = {
  title: "Budge",
  description: "Track and manage your money easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <AuthSession>
            <MainLayout>{children}</MainLayout>
          </AuthSession>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
