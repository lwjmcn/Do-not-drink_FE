"use client";
import { useRouter } from "next/navigation";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Stack } from "@mui/material";

export default function MenuButton() {
  const router = useRouter();
  return (
    <Stack
      direction={"row"}
      spacing={2}
      position={"absolute"}
      top={20}
      right={20}
    >
      {/* 알림 */}
      <button
        onClick={() => alert("알림 기능은 준비중입니다.")}
        style={{
          border: "none",
          background: "none",
          color: "#FE9600",
        }}
      >
        <NotificationsNoneRoundedIcon />
      </button>
      {/* 기타 메뉴 */}
      <button
        onClick={() => alert("메뉴 기능은 준비중입니다.")}
        style={{
          border: "none",
          background: "none",
          color: "#FE9600",
        }}
      >
        <MenuRoundedIcon />
      </button>
    </Stack>
  );
}
