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
      <Box component="main" sx={{ backgroundColor: "background.default" }}>
        {children}
        <Copyright />
      </Box>
    </AppTheme>
  );
};

export default MainLayout;
