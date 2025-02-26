"use client";

import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useForm } from "react-hook-form";
import Input from "@component/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInRequestDto } from "app/_api/request/auth.request.dto";
import { SignInResponseDto } from "app/_api/response/auth.response.dto";
import { signInRequest } from "app/_api/auth/auth";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { setCookie } from "cookies-next";

interface ISignInForm extends SignInRequestDto {}
const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";

  const { handleSubmit, control } = useForm<ISignInForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const signInResponse = (
    responseBody: ResponseBody<SignInResponseDto>
  ): void => {
    if (!responseBody) return;
    const { code, token, expirationTime } = responseBody as SignInResponseDto;

    let message = "";
    if (code == ResponseCode.SIGN_IN_FAIL)
      message = "이메일 또는 비밀번호가 일치하지 않습니다.";
    if (code == ResponseCode.DATABASE_ERROR)
      message = "데이터베이스 오류입니다.";
    if (code == ResponseCode.SUCCESS) {
      message = "로그인이 완료되었습니다.";
      alert(message);

      const now = new Date().getTime() * 1000;
      const expires = new Date(now + expirationTime);
      setCookie("accessToken", token, { expires, path: "/" });

      router.push(callbackUrl);
      alert("홈?");
      return;
    }

    alert(message);
  };
  const onSubmit = async (data: ISignInForm) => {
    console.log(data);
    alert(JSON.stringify(data));

    await signInRequest(data).then(signInResponse);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      spacing={2}
    >
      <Input name="email" label="이메일" control={control} />
      <Input
        name="password"
        label="비밀번호"
        control={control}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: showPassword ? (
            <VisibilityRoundedIcon
              onClick={() => setShowPassword(false)}
              sx={{ cursor: "pointer" }}
              fontSize="small"
              color="action"
            />
          ) : (
            <VisibilityOffRoundedIcon
              onClick={() => setShowPassword(true)}
              sx={{ cursor: "pointer" }}
              fontSize="small"
              color="action"
            />
          ),
        }}
      />

      {/* TODO Refresh token */}
      {/* <Stack direction={"row"} justifyContent={"space-between"}>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="자동 로그인"
        />
      </Stack> */}

      <Button type="submit" variant="contained">
        <Typography>로그인</Typography>
      </Button>
    </Stack>
  );
};

export default SignInForm;
