"use client";

import { Box, Stack } from "@mui/material";
import MyPage from "./_component/MyPage";
import BackButton from "@component/BackButton";
import LogoutButton from "app/menu/_component/LogoutButton";

export default function MenuPage() {
  return (
    <Stack direction={"column"} alignItems={"center"} marginTop={6}>
      <BackButton />

      <MyPage />
      <LogoutButton />
    </Stack>
  );
}
