import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import MainLayout from "@component/MainLayout";
import MediaSizeDisplay from "@component/media_query/MedaiSizeDisplay";

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
      <body style={{ backgroundColor: "#fff6e1" }}>
        <AppRouterCacheProvider>
          <MainLayout>{children}</MainLayout>
          <MediaSizeDisplay />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
