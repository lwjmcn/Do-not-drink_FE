"use client";

import React, { useState } from "react";
import { Paper } from "@mui/material";
import FriendList from "./FriendList";
import MyInfo from "./MyInfo";
import SettingList from "./SettingList";

// 타입 정의
export interface Friend {
  id: number;
  nickname: string;
  avatar?: string;
  accountId: string;
}

export interface UserInfo {
  id: string;
  nickname: string;
  avatar?: string;
  friends: Friend[];
}

// 샘플 데이터
const sampleUser: UserInfo = {
  id: "user_test_123",
  nickname: "이예진",
  avatar: "/image/orange_juice.png",
  friends: [
    { id: 1, nickname: "구름달빛", accountId: "ksdjfh2" },
    { id: 2, nickname: "행복한곰돌이", accountId: "dorrraa" },
    { id: 3, nickname: "딸기우유", accountId: "beryyeee8" },
    { id: 4, nickname: "바닐라라떼", accountId: "clare22" },
  ],
};

export default function MyPage() {
  const [user, setUser] = useState<UserInfo>(sampleUser);

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
      <FriendList friends={user.friends} />
    </Paper>
  );
}
