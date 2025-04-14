"use client";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import ReactionButton from "./ReactionButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Budget from "./Budget";
import { useRouterWrapper } from "./page_transition/RouterWrapperContext";
import GLTFViewer from "./GLTFViewer";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { getRemainingBudget, myReactionEventUrl } from "app/_api/budget";
import { BudgetRemainingResponseDto } from "app/_api/response/budget.response.dto";
import EmptyBudget from "./EmptyBudget";
import BabylonView from "@component/fluid/BabylonView";

export default function UserMeLayout() {
  const likes = 100;
  const dislikes = 4;

  const router = useRouter();
  const { setTransitionDisable } = useRouterWrapper();

  const [remains, setRemains] = useState<number | null>(null);

  const getRemainingBudgetApi = async () => {
    await getRemainingBudget().then(getRemainingBudgetApiResponse);
  };
  const getRemainingBudgetApiResponse = (
    responseBody: ResponseBody<BudgetRemainingResponseDto>
  ) => {
    if (!responseBody) return;

    const { code, message, remains } =
      responseBody as BudgetRemainingResponseDto;

    if (code == ResponseCode.SUCCESS) {
      setRemains(remains);
    } else if (code == ResponseCode.BUDGET_UNDEFINED) {
      setRemains(null);
    } else {
      console.log("getRemainingBudget: ", message);
    }
  };

  const subscribeMyReaction = (event: any) => {
    const data = JSON.parse(event.data);
    console.log("MyReactionEvent data:", data);
  }; // TODO reaction map으로 들어올 것임

  useEffect(() => {
    getRemainingBudgetApi();

    // if (!remains) return;
    // const eventSource = new EventSource(myReactionEventUrl());
    // eventSource.addEventListener("message", subscribeMyReaction);
    // eventSource.onerror = (error) => {
    //   console.log("MyReactionEvent error:", error);
    //   eventSource.close();
    // };

    // return () => {
    //   eventSource.close();
    // }; // TODO sse error --> authorization header 추가필요
  }, [remains]);

  if (remains === undefined) {
    return (
      <Stack alignItems={"center"}>
        <CircularProgress />
      </Stack>
    );
  } else if (remains == null) {
    return <EmptyBudget />;
  } else {
    return (
      <Stack
        direction={"column"}
        spacing={2}
        marginY={"auto"}
        alignItems={"center"}
      >
        <Budget remains={remains} />
        <Suspense>
          <Link href={"/category"} onClick={() => setTransitionDisable(true)}>
            {/* <GLTFViewer filename="orange_juice.glb" /> */}
            {/* TODO 주스 테마, 주스 양 조절 */}
            <BabylonView />
          </Link>
        </Suspense>

        <Stack direction="row" spacing={2} alignItems={"center"}>
          <ReactionButton isLike={true} count={likes} enabled={false} />
          <Button
            variant="text"
            onClick={() => router.push("/input")}
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#FFD67D",
              fontSize: 16,
            }}
          >
            <Typography variant="button" color="#fff">
              한 입
            </Typography>
          </Button>
          <ReactionButton isLike={false} count={dislikes} enabled={false} />
        </Stack>
      </Stack>
    );
  }
}
