"use client";

import { useParams, usePathname } from "next/navigation";
import ExtendedLink from "./page_transition/ExtendedLink";
import ArrowLeft from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowRight from "@mui/icons-material/ArrowForwardIosRounded";
import { getFriends } from "app/_api/friend";
import { FriendshipListResponseDto } from "app/_api/response/friend.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useEffect, useState } from "react";

export default function CarouselLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [friendCount, setFriendCount] = useState<number>(0);
  const { id } = useParams();
  const pathname = usePathname();

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
      setFriendCount(friends.length);
    } else {
      console.log("getFriends: ", message);
    }
  };

  useEffect(() => {
    getFriendsApi();
  }, []);

  const nextHref = pathname.endsWith("/add")
    ? "/home"
    : pathname.endsWith("/home")
    ? friendCount === 0
      ? `/home/friend/add`
      : `/home/friend/1`
    : pathname.endsWith(`/friend/${friendCount}`)
    ? `/home/friend/add`
    : `/home/friend/${parseInt(id as string) + 1}`;
  const prevHref = pathname.endsWith("/add")
    ? friendCount === 0
      ? `/home`
      : `/home/friend/${friendCount}`
    : pathname.endsWith("/home")
    ? `/home/friend/add`
    : pathname.endsWith(`/friend/1`)
    ? `/home`
    : `/home/friend/${parseInt(id as string) - 1}`;
  return (
    <>
      {children}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: "50vh",
          transform: "translateY(-50%)",
        }}
      >
        <ExtendedLink href={prevHref} isBack={true}>
          <ArrowLeft style={{ color: "#FFD676" }} />
        </ExtendedLink>
      </div>
      <div
        style={{
          position: "absolute",
          right: 10,
          top: "50vh",
          transform: "translateY(-50%)",
        }}
      >
        <ExtendedLink href={nextHref} isBack={false}>
          <ArrowRight style={{ color: "#FFD676" }} />
        </ExtendedLink>
      </div>
    </>
  );
}
