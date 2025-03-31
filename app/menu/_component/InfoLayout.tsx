import { Box, Typography, Divider } from "@mui/material";
import { cloneElement, ReactElement } from "react";

interface InfoLayoutProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}
export default function InfoLayout({ children, title, icon }: InfoLayoutProps) {
  return (
    <Box padding={2}>
      <Box
        sx={{
          backgroundColor: "#FFBD5D",
          color: "#fff",
          paddingX: 1.5,
          paddingY: 0.5,
          borderRadius: "50px",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {cloneElement(icon as ReactElement<{ sx?: object }>, {
          sx: {
            fontSize: 18,
            marginRight: 0.5,
          },
        })}
        <Typography variant="subtitle2">{title}</Typography>
      </Box>

      <Divider sx={{ marginY: 1, borderColor: "#FFE6AC" }} />
      {children}
    </Box>
  );
}
