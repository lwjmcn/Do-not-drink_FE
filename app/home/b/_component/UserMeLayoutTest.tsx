"use client";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouterWrapper } from "../../_component/page_transition/RouterWrapperContext";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { getRemainingBudget } from "app/_api/budget";
import { BudgetRemainingResponseDto } from "app/_api/response/budget.response.dto";
import EmptyBudget from "../../_component/EmptyBudget";
import ExpenseList from "./ExpenseList";
import { track } from "@vercel/analytics";

export default function UserMeLayoutTest() {
  const router = useRouter();
  const { setTransitionDisable } = useRouterWrapper();

  const [remains, setRemains] = useState<number | null | undefined>(undefined);

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
    track("home B", { timestamp: new Date().toISOString() });
  }, [remains]);

  if (remains === undefined) {
    return (
      <Stack alignItems={"center"}>
        <CircularProgress />
      </Stack>
    );
  } else {
    return (
      <Stack direction={"column"} alignItems={"center"}>
        {/* 예산, 지출, 합계 */}
        <Stack direction={"row"} width={"100%"}>
          <Stack
            direction={"column"}
            spacing={0.5}
            alignItems={"center"}
            width={"33%"}
            onClick={() => {
              track("home B set budget click", {
                timestamp: new Date().toISOString(),
              });
              router.push("/set-budget");
            }}
          >
            <Typography variant="body2">예산</Typography>
            <Typography variant="body1" fontWeight={600} color="#F31D64">
              {remains == null ? "?" : 500000}원
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            spacing={0.5}
            alignItems={"center"}
            width={"33%"}
          >
            <Typography variant="body2">지출</Typography>
            <Typography variant="body1" fontWeight={600} color="#0095EF">
              {remains == null ? "?" : 500000 - remains}원
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            spacing={0.5}
            alignItems={"center"}
            width={"33%"}
          >
            <Typography variant="body2">합계</Typography>
            <Typography variant="body1" fontWeight={600}>
              {remains == null ? "?" : remains}원
            </Typography>
          </Stack>
        </Stack>

        <ExpenseList />
      </Stack>
    );
  }
}
