"use client";

import { Button, Stack, Typography } from "@mui/material";
import ReactionButton from "./ReactionButton";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouterWrapper } from "./page_transition/RouterWrapperContext";
import GLTFViewer from "./GLTFViewer";
import { getFriends } from "app/_api/friend";
import {
  FriendDto,
  FriendshipListResponseDto,
} from "app/_api/response/friend.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { UserDto } from "app/_api/response/user.response.dto";
import { friendReactionEventUrl } from "app/_api/budget";

interface FriendLayoutProps {
  friendId: number;
}
export default function FriendLayout({ friendId }: FriendLayoutProps) {
  const likes = 100;
  const dislikes = 4;

  const router = useRouter();
  const { setTransitionDisable } = useRouterWrapper();

  const [user, setUser] = useState<FriendDto | null>(null);

  const getFriendsApi = async () => {
    await getFriends().then(getFriendsApiResponse);
  };
  const getFriendsApiResponse = (
    responseBody: ResponseBody<FriendshipListResponseDto>
  ) => {
    if (!responseBody) return;

    const { code, message, friends } =
      responseBody as FriendshipListResponseDto;

    if (code == ResponseCode.SUCCESS) {
      setUser(friends[friendId - 1]);
    } else {
      console.log("getFriends: ", message);
    }
  };
  const subscribeFriendReaction = (event: any) => {
    const data = JSON.parse(event.data);
    console.log("FriendReactionEvent data:", data);
  }; // TODO reaction map으로 들어올 것임

  useEffect(() => {
    getFriendsApi();

    // const eventSource = new EventSource(friendReactionEventUrl(friendId));
    // eventSource.addEventListener("message", subscribeFriendReaction);
    // eventSource.onerror = (error) => {
    //   console.error("Error occurred:", error);
    //   eventSource.close();
    // };

    // return () => {
    //   eventSource.close();
    // }; // TODO sse error
  }, []);

  return (
    <Stack
      direction={"column"}
      spacing={2}
      marginY={"auto"}
      alignItems={"center"}
    >
      <Typography variant="h2">{user?.nickname + " 님"}</Typography>

      <Suspense>
        <Link href={"/category"} onClick={() => setTransitionDisable(true)}>
          <GLTFViewer filename="orange_juice.glb" />
          {/* TODO 주스 테마, 주스 양 조절 */}
        </Link>
      </Suspense>
      <Typography variant="caption">{user?.remainingRate}</Typography>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <ReactionButton isLike={true} count={likes} enabled={true} />
        <Button
          variant="text"
          onClick={() => router.push("/input")}
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "#FFD67D",
            fontSize: 16,
            visibility: "hidden",
          }}
        >
          <Typography variant="button" color="#fff">
            한 입
          </Typography>
        </Button>
        <ReactionButton isLike={false} count={dislikes} enabled={true} />
      </Stack>
    </Stack>
  );
}
