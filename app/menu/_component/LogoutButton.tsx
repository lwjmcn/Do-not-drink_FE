"use client";

import { Button } from "@mui/material";
import { signOutRequest } from "app/_api/user";
import ResponseDto, { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { deleteToken, getCookie } from "public/util/cookies";
import { useRouter } from "next/navigation";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";

export default function LogoutButton() {
  const router = useRouter();

  const onClickLogout = async () => {
    await signOutRequest().then((responseBody: ResponseBody<ResponseDto>) => {
      if (responseBody) {
        const { code } = responseBody;
        if (code == ResponseCode.SUCCESS) {
          console.log("로그아웃 되었습니다.");
          deleteToken();
          router.push("/auth/signin");
          return;
        }
      }
      console.log("로그아웃 실패");
    });
  };

  return (
    <Button
      variant="text"
      fullWidth
      sx={{
        maxWidth: "340px",
        borderRadius: "50px",
        padding: "8px 24px",
        backgroundColor: "#ffd676",
        color: "#fff",
        fontWeight: 600,
        "&:hover": {
          backgroundColor: "#FE9600",
        },
        gap: 1,
        marginTop: 2,
      }}
      onClick={onClickLogout}
    >
      <MeetingRoomRoundedIcon />
      로그아웃
    </Button>
  );
}
