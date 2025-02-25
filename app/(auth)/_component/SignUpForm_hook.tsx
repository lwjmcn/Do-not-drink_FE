"use client";

import { useActionState, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ExclamationCircleIcon from "@mui/icons-material/InfoRounded";
import { useSearchParams } from "next/navigation";
import { authenticate } from "app/api/auth/signin";
import { accountIdCheckRequest } from "app/api/auth/auth";
import AccountIdCheckResponseDto from "app/api/response/auth/account-id-check.response.dto";
import ResponseDto, { ResponseBody } from "app/api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useForm } from "react-hook-form";
import Input from "../../_component/Input";

interface IForm {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string; // 이것은... 다음 페이지에서...
  accountId: string;
}
const SignUpForm = () => {
  const callbackUrl = "/home";

  const { control, handleSubmit, setError, setFocus } = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      accountId: "",
    },
  });
  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const onSubmit = async (data: IForm) => {
    console.log(data);
    alert(data);
    setError("email", {
      type: "manual",
      message: "이메일 중복확인을 해주세요",
    });
    setFocus("email");

    setError("passwordCheck", {
      type: "manual",
      message: "비밀번호가 일치하지 않습니다.",
    });
    setFocus("passwordCheck");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      <Input
        name="email"
        label="이메일"
        control={control}
        rules={{
          required: "이메일을 입력해주세요",
          pattern: { value: emailPattern, message: "이메일 형식이 아닙니다." },
        }}
        InputProps={{
          endAdornment: <Chip label={"중복 확인"} variant="outlined" />,
        }}
      />
      <Input
        name="password"
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        control={control}
        rules={{
          required: "비밀번호를 입력해주세요",
          pattern: {
            value: passwordPattern,
            message: "영문, 숫자를 포함해 8-13자리로 입력해주세요.",
          },
        }}
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
      <Input
        name="passwordCheck"
        label="비밀번호 확인"
        type={showPasswordCheck ? "text" : "password"}
        control={control}
        rules={{
          required: "비밀번호를 다시 입력해주세요",
        }}
        InputProps={{
          endAdornment: showPasswordCheck ? (
            <VisibilityRoundedIcon
              onClick={() => setShowPasswordCheck(false)}
              sx={{ cursor: "pointer" }}
              fontSize="small"
              color="action"
            />
          ) : (
            <VisibilityOffRoundedIcon
              onClick={() => setShowPasswordCheck(true)}
              sx={{ cursor: "pointer" }}
              fontSize="small"
              color="action"
            />
          ),
        }}
      />
      <Button type="submit" variant="contained">
        <Typography>가입하기</Typography>
      </Button>
    </Box>
  );
};

export default SignUpForm;
