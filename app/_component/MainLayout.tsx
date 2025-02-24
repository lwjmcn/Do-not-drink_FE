"use client";

import { CssBaseline, Box } from "@mui/material";
import AppTheme from "public/style/AppTheme";
import Copyright from "./Copyright";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: { xs: "90%", sm: "90%", md: "90%", lg: "450px" },
          minHeight: "100vh",
          marginX: "auto",
          paddingY: 2,
          backgroundColor: "background.default",
        }}
      >
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Copyright />
      </Box>
    </AppTheme>
  );
};

export default MainLayout;
