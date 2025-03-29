"use client";

import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useFormContext } from "react-hook-form";
import Input from "@component/Input";
import { useRouter } from "next/navigation";
import { ISignUpForm } from "./SignUpFormProvider";

const EmailSignUpForm = () => {
  const router = useRouter();

  const { trigger } = useFormContext<ISignUpForm>();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const onClickNext = async () => {
    // 이메일 중복 확인은 마지막에 백엔드에서 진행
    const isValid = await trigger(["email", "password", "passwordCheck"]);
    if (!isValid) return;

    router.push("/auth/signup/profile");
  };
  return (
    <Stack direction="column" spacing={2}>
      <Input name="email" label="이메일" />
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
      <Button
        type="button"
        variant="text"
        onClick={onClickNext}
        sx={{ bgcolor: "#fff" }}
      >
        <Typography variant="button" color="#000">
          다음으로
        </Typography>
      </Button>
    </Stack>
  );
};

export default EmailSignUpForm;
