"use client";

import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import FriendList from "./FriendList";
import MyInfo from "./MyInfo";
import SettingList from "./SettingList";
import {
  UserDto,
  UserMeResponseDto,
} from "app/_api/response/user.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import { getCurrentUser } from "app/_api/user";
import ResponseCode from "public/type/response_code";

export default function MyPage() {
  const [user, setUser] = useState<UserDto | null>(null);

  const getCurrentUserApi = async () => {
    await getCurrentUser().then(getCurrentUserApiResponse);
  };
  const getCurrentUserApiResponse = (
    responseBody: ResponseBody<UserMeResponseDto>
  ) => {
    if (!responseBody) return;

    const { code, message, user } = responseBody as UserMeResponseDto;

    if (code == ResponseCode.SUCCESS) {
      setUser(user);
    } else {
      console.log("getCurrentUser: ", message);
    }
  };

  useEffect(() => {
    getCurrentUserApi();
  }, []);

  return (
    <Paper
      sx={{
        maxWidth: "340px",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        gap: 2,
      }}
    >
      <MyInfo user={user} />
      <SettingList user={user} />
      <FriendList />
    </Paper>
  );
}
