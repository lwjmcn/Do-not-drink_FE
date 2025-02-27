"use client";

import { Box, Button } from "@mui/material";
import Carousel from "./_component/Carousel";
import { signOutRequest } from "app/_api/user";
import ResponseDto, { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { deleteToken } from "public/util/cookies";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const onClickLogout = async () => {
    await signOutRequest().then((responseBody: ResponseBody<ResponseDto>) => {
      if (responseBody) {
        const { code } = responseBody;
        if (code == ResponseCode.SUCCESS) {
          alert("로그아웃 되었습니다.");
          deleteToken();
          router.push("/auth/signin");
          return;
        }
      }
      alert("로그아웃 실패");
    });
  };

  return (
    <Box>
      <Button
        variant="text"
        size="small"
        sx={{
          textDecoration: "underline",
          textUnderlineOffset: 4,
          position: "absolute",
        }}
        onClick={onClickLogout}
      >
        Logout
      </Button>
      {/* <Carousel /> */}
    </Box>
  );
};

export default Home;
