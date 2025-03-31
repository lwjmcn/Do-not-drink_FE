"use client";
import ModalContainer from "@component/ModalContainer";
import { Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { setBudget } from "app/_api/budget";
import { BudgetSetResponseDto } from "app/_api/response/budget.response.dto";
import { BudgetSetRequestDto } from "app/_api/request/budget.request.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useRouter } from "next/navigation";

export default function SetBudgetModal() {
  const router = useRouter();

  const [budgetInput, setBudgetInput] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setBudgetApi = async (data: BudgetSetRequestDto) => {
    await setBudget(data).then(setBudgetApiResponse);
  };
  const setBudgetApiResponse = (
    responseBody: ResponseBody<BudgetSetResponseDto>
  ) => {
    if (!responseBody) return;

    const { code, message } = responseBody as BudgetSetResponseDto;

    if (code == ResponseCode.SUCCESS) {
      console.log("예산이 설정되었습니다.");
      router.replace("/set-budget/complete");
    } else {
      setError(true);
      setErrorMessage(message);
      console.log("setBudget: ", message);
    }
  };

  const onClickPositive = () => {
    setBudgetApi({ budget: budgetInput });
  };

  return (
    <ModalContainer onClickPositive={onClickPositive}>
      <Stack
        direction="column"
        spacing={2}
        marginBottom={2}
        marginX={1}
        alignItems={"center"}
      >
        <Typography variant="h6" color="#717171">
          이번 달 <span style={{ color: "#FE9600" }}>예산</span>은 얼마인가요?
        </Typography>
        <TextField
          variant="standard"
          size="medium"
          value={budgetInput}
          onChange={(e) => setBudgetInput(Number(e.target.value))}
          required={true}
          error={error}
          helperText={error ? errorMessage : ""}
          FormHelperTextProps={{
            sx: { marginLeft: 0 },
          }}
          InputProps={{
            endAdornment: <Typography>원</Typography>,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          sx={{
            width: "120px",
          }}
        />
      </Stack>
    </ModalContainer>
  );
}
