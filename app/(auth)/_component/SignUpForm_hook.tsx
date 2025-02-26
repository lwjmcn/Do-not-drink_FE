"use client";

import { useState } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useForm, useFormContext } from "react-hook-form";
import Input from "../../_component/Input";
import { useRouter } from "next/navigation";
import { ISignUpForm } from "./SignUpFormProvider";

const SignUpForm = () => {
  const router = useRouter();
  const callbackUrl = "/home";

  const { trigger, setError, setFocus } = useFormContext<ISignUpForm>();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const onClickNext = async () => {
    // 이메일 중복 확인
    // 패스워드 형식 확인
    // 패스워드 일치 확인
    const isValid = await trigger(["email", "password", "passwordCheck"]);
    if (!isValid) {
      router.push("/auth/sign-up");
    }
  };
  return (
    <Box
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
        InputProps={{
          endAdornment: <Chip label={"중복 확인"} variant="outlined" />,
        }}
      />
      <Input
        name="password"
        label="비밀번호"
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
      <Input
        name="passwordCheck"
        label="비밀번호 확인"
        type={showPasswordCheck ? "text" : "password"}
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
