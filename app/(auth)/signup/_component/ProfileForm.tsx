"use client";

import { Button, Chip, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Input from "@component/Input";
import { useRouter } from "next/navigation";
import { ISignUpForm } from "./SignUpFormProvider";
import { accountIdCheckRequest } from "app/api/auth/auth";
import AccountIdCheckResponseDto from "app/api/response/auth/account-id-check.response.dto";
import { ResponseBody } from "app/api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useState } from "react";

const ProfileForm = () => {
  const router = useRouter();
  const { trigger, getValues, setError, setFocus } =
    useFormContext<ISignUpForm>();

  const [accountIdCheck, setAccountIdCheck] = useState(false);
  const onClickAccountIdCheck = async () => {
    const isValid = await trigger("accountId");
    if (isValid)
      await accountIdCheckRequest({ accountId: getValues("accountId") }).then(
        accountIdCheckReponse
      );
  };
  const accountIdCheckReponse = (
    responseBody: ResponseBody<AccountIdCheckResponseDto>
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;

    let message = "";
    if (code == ResponseCode.VALIDATION_FAIL)
      message = "아이디 형식이 유효하지 않습니다.";
    if (code == ResponseCode.DUPLICATE_ID)
      message = "이미 존재하는 아이디입니다.";
    if (code == ResponseCode.DATABASE_ERROR)
      message = "데이터베이스 오류입니다.";
    if (code == ResponseCode.SUCCESS) {
      message = "사용 가능한 아이디입니다.";
      setAccountIdCheck(true);
      return;
    }

    setError("accountId", { message: message });
    setFocus("accountId");
  };

  const onClickNext = async () => {
    if (!accountIdCheck) {
      // 아이디 중복체크 완료됐는지 확인
      setError("accountId", { message: "아이디 중복 확인을 해주세요." });
      setFocus("accountId");
      return;
    }
    const isValid = await trigger(["nickname", "accountId"]);
    if (!isValid) return;

    router.push("/signup/theme");
  };

  return (
    <Stack direction="column" spacing={2}>
      <Input name="nickname" label="닉네임" />
      <Input
        name="accountId"
        label="아이디"
        onChangeCapture={() => setAccountIdCheck(false)}
        InputProps={{
          endAdornment: (
            <Chip
              label={accountIdCheck ? "확인 완료" : "중복 확인"}
              variant="filled"
              disabled={accountIdCheck}
              onClick={onClickAccountIdCheck}
            />
          ),
        }}
      />
      <Button type="button" variant="contained" onClick={onClickNext}>
        <Typography>다음으로</Typography>
      </Button>
    </Stack>
  );
};

export default ProfileForm;
