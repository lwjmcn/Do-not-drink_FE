import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import MainLayout from "@component/MainLayout";
import MediaSizeDisplay from "@component/media_query/MedaiSizeDisplay";
import AppTheme from "public/style/AppTheme";
import { CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "Budge",
  description: "Track and manage your money easily",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#fff6e1" }}>
        <AppRouterCacheProvider>
          <AppTheme>
            <CssBaseline enableColorScheme />
            {modal}
            <MainLayout>{children}</MainLayout>
            <MediaSizeDisplay />
          </AppTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
