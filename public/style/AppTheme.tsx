"use client";

import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { inputs } from "./mui/inputs";
import { dataDisplay } from "./mui/dataDisplay";
import { feedback } from "./mui/feedback";
import { navigation } from "./mui/navigation";
import { surfaces } from "./mui/surfaces";
import { colorSchemes, typography, shadows, shape } from "./theme";

interface IAppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions["components"];
}

export default function AppTheme(props: IAppThemeProps) {
  const { children, themeComponents } = props;
  const theme = useMemo(() => {
    return createTheme({
      cssVariables: {
        colorSchemeSelector: "data-mui-color-scheme",
      },
      colorSchemes, // light and dark mode
      typography,
      shadows,
      shape,
      components: {
        ...inputs,
        ...dataDisplay,
        ...feedback,
        ...navigation,
        ...surfaces,
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
