"use client";
import { useRouter } from "next/navigation";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Badge, Stack } from "@mui/material";

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
        onClick={() => router.push("/notification")}
        style={{
          border: "none",
          background: "none",
          color: "#FE9600",
          cursor: "pointer",
        }}
      >
        <Badge
          variant="dot"
          invisible={false}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "red",
              translate: "-2px 2px",
              minWidth: 8,
              height: 8,
            },
          }}
        >
          <NotificationsNoneRoundedIcon />
        </Badge>
      </button>
      {/* 기타 메뉴 */}
      <button
        onClick={() => router.push("/menu")}
        style={{
          border: "none",
          background: "none",
          color: "#FE9600",
          cursor: "pointer",
        }}
      >
        <MenuRoundedIcon />
      </button>
    </Stack>
  );
}
