"use client";

import { Stack } from "@mui/material";
import { FriendStatusType } from "public/type/friend_status";
import NotificationItem from "./NotificationItem";
import EmptyNotification from "./Empty";
import { getReceivedFriendRequests } from "app/_api/friend";
import {
  FriendReqDto,
  FriendReqListResponseDto,
} from "app/_api/response/friend.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useEffect, useState } from "react";

interface NotificationData {
  friendRequestId: number;
  userId: number;
  nickname: string;
  accountId: string;
  status: FriendStatusType;
}

export default function NotificationList() {
  const [friendRequests, setFriendRequests] = useState<FriendReqDto[]>([]);

  const getReceivedFriendRequestsApi = async () => {
    await getReceivedFriendRequests().then(
      getReceivedFriendRequestsApiResponse
    );
  };
  const getReceivedFriendRequestsApiResponse = (
    responseBody: ResponseBody<FriendReqListResponseDto>
  ) => {
    if (!responseBody) return;
    const { code, message, friendRequests } =
      responseBody as FriendReqListResponseDto;
    if (code == ResponseCode.SUCCESS) {
      const filteredRequests = friendRequests.filter(
        (request) => request.status !== FriendStatusType.REJECT // 거절한 요청은 표시하지 않음
      );
      setFriendRequests(filteredRequests);
      console.log("getReceivedFriendRequests: ", filteredRequests);
    } else {
      console.log("getReceivedFriendRequests: ", message);
    }
  };

  useEffect(() => {
    getReceivedFriendRequestsApi();
  }, []);

  const sortNoread = (a: FriendReqDto, b: FriendReqDto) => {
    if (
      a.status === FriendStatusType.NOREAD &&
      b.status !== FriendStatusType.NOREAD
    ) {
      return -1; // a가 더 우선
    } else if (
      a.status !== FriendStatusType.NOREAD &&
      b.status === FriendStatusType.NOREAD
    ) {
      return 1; // b가 더 우선
    } else {
      return 0; // 같음
    }
  };

  if (friendRequests.length === 0) {
    return <EmptyNotification />;
  } else {
    return (
      <Stack
        component={"ol"}
        direction={"column"}
        spacing={1}
        sx={{ marginTop: 6 }}
      >
        {friendRequests.sort(sortNoread).map((friendReq) => (
          <NotificationItem
            key={friendReq.requestId}
            friendRequestId={friendReq.requestId}
            userId={friendReq.userId}
            nickname={friendReq.nickname}
            accountId={friendReq.accountId}
            status={friendReq.status}
          />
        ))}
      </Stack>
    );
  }
}
