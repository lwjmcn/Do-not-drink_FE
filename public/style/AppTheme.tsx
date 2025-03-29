"use client";

import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { colorSchemes, typography, shadows, shape } from "./theme";

interface IAppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions["components"];
}

export default function AppTheme(props: IAppThemeProps) {
  const { children, themeComponents } = props;
  const theme = useMemo(() => {
    return createTheme({
      colorSchemes, // light and dark mode
      typography,
      shadows,
      shape,
      components: {
        ...themeComponents,
      },
    });
  }, [themeComponents]);
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
