"use client";

import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { cloneElement, ReactElement } from "react";

interface IconBoxProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}
const IconBox = ({ icon, text, href }: IconBoxProps) => {
  const router = useRouter();

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={200}
      sx={{
        bgcolor: "#FFBA18",
        borderRadius: 2,
        ":hover:active": {
          backgroundColor: "#FFF6E1",
          transition: "background-color 0.3s ease",
        },
        cursor: "pointer",
      }}
      onClick={() => router.push(href)}
    >
      {cloneElement(icon as ReactElement<{ sx?: object }>, {
        sx: {
          fontSize: "80px",
          color: "#fff",
          opacity: 0.7,
        },
      })}

      <Typography variant="h6" color="#fff">
        {text}
      </Typography>
    </Stack>
  );
};

export default IconBox;
