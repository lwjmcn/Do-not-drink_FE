"use client";

import { CssBaseline, Box, Stack, alpha } from "@mui/material";
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
        sx={(theme: any) => ({
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
        })}
      >
        <Box minHeight={"calc(100vh - 40px)"} padding={2}>
          {children}
        </Box>
        <Copyright />
      </Box>
    </AppTheme>
  );
};

export default MainLayout;
