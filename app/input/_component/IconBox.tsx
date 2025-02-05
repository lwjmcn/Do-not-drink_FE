"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { cloneElement, ReactElement } from "react";

interface IIconBoxProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
}
const IconBox = (props: IIconBoxProps) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(50vh - 100px)",
        bgcolor: "info.contrastText",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ":hover:active": {
          backgroundColor: "info.light",
          transition: "background-color 0.3s ease",
        },
        cursor: "pointer",
      }}
      onClick={() => props.href && router.push(props.href)}
    >
      {cloneElement(props.icon as ReactElement<{ sx?: object }>, {
        sx: {
          fontSize: "80px",
          color: "text.secondary",
          opacity: 0.7,
        },
      })}

      <Typography variant="h6" sx={{ opacity: 0.5, fontWeight: 600 }}>
        {props.text}
      </Typography>
    </Box>
  );
};

export default IconBox;
