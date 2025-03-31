"use client";
import ModalContainer from "@component/ModalContainer";
import { Stack, Typography, TextField } from "@mui/material";
import { requestFriend } from "app/_api/friend";
import { FriendReqRequestDto } from "app/_api/request/friend.request.dto";
import { FriendReqResponseDto } from "app/_api/response/friend.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import { useRouter } from "next/navigation";
import ResponseCode from "public/type/response_code";
import { useState } from "react";

export default function SetBudgetModal() {
  const router = useRouter();

  const [accountId, setAccountId] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const requestFriendApi = async (data: FriendReqRequestDto) => {
    await requestFriend(data).then(requestFriendApiResponse);
  };
  const requestFriendApiResponse = (
    responseBody: ResponseBody<FriendReqResponseDto>
  ) => {
    if (!responseBody) return;

    const { code, message } = responseBody as FriendReqResponseDto;

    console.log("requestFriend: ", message);
    if (code == ResponseCode.SUCCESS) {
      router.replace("/add-friend/success");
    } else if (code == ResponseCode.USER_NOT_FOUND) {
      router.replace("/add-friend/fail");
    } else {
      setError(true);
      setErrorMessage(message);
    }
  };

  const onClickPositive = () => {
    if (accountId.trim() === "") {
      setError(true);
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }
    const data: FriendReqRequestDto = {
      receiverAccountId: accountId,
    };

    requestFriendApi(data);
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
          친구의 <span style={{ color: "#FE9600" }}>아이디</span>를 아시나요?
        </Typography>
        <TextField
          variant="standard"
          size="medium"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required={true}
          error={error}
          helperText={error ? errorMessage : ""}
          FormHelperTextProps={{
            sx: { marginLeft: 0 },
          }}
          sx={{
            width: "120px",
          }}
        />
      </Stack>
    </ModalContainer>
  );
}
