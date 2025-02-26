"use client";

import { useActionState, useState } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ExclamationCircleIcon from "@mui/icons-material/InfoRounded";
import { useSearchParams } from "next/navigation";
import { authenticate } from "app/_api/auth/signin";
import { accountIdCheckRequest } from "app/_api/auth/auth";
import AccountIdCheckResponseDto from "app/api/response/auth/account-id-check.response.dto";
import ResponseDto, { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/; // bool = emailPattern.test(email);
  const passwordPattern = /^(?=.[a-zA-Z])(?=.[0-9])[a-zA-Z0-9]{8,13}$/; // bool = passwordPattern.test(password);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [accountIdError, setAccountIdError] = useState(false);
  const [accountIdErrorMessage, setAccountIdErrorMessage] = useState("");

  const handleAccountIdCheck = async () => {
    const accountId = document.getElementById("account-id") as HTMLInputElement;
    if (!accountId) return;

    accountIdCheckRequest({ accountId: accountId.value }).then(
      accountIdCheckReponse
    );
  };
  const accountIdCheckReponse = (
    responseBody: ResponseBody<AccountIdCheckResponseDto>
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code == ResponseCode.VALIDATION_FAIL) alert("아이디를 입력해주세요");

    // setAccountIdErrorMessage("아이디를 입력해주세요");
    if (code == ResponseCode.DUPLICATE_ID) alert("이미 존재하는 아이디입니다.");
    // setAccountIdErrorMessage("이미 존재하는 아이디입니다.");
    if (code == ResponseCode.DATABASE_ERROR) alert("데이터베이스 오류입니다.");

    // setAccountIdErrorMessage("데이터베이스 오류입니다.");
    if (code == ResponseCode.SUCCESS) {
      alert("사용 가능한 아이디입니다.");
      return;
    }

    setAccountIdError(true);
  };
  return (
    <Box
      component="form"
      action={formAction}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 0.5,
      }}
    >
      <FormControl>
        <TextField
          label="Email"
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={emailError ? "error" : "primary"}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Password"
          error={passwordError}
          helperText={passwordErrorMessage}
          name="password"
          placeholder="••••••"
          id="password"
          autoComplete="current-password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={passwordError ? "error" : "primary"}
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
      </FormControl>
      <FormControl>
        <TextField
          label="Password Check"
          // error={passwordError}
          // helperText={passwordErrorMessage}
          name="password-check"
          // placeholder="••••••"
          id="password-check"
          // autoComplete="current-password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          // color={passwordError ? "error" : "primary"}
          // type={showPassword ? "text" : "password"}
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
      </FormControl>
      <FormControl>
        <TextField
          label="Nickname"
          // error={emailError}
          // helperText={emailErrorMessage}
          id="nickname"
          type="text"
          name="nickname"
          // placeholder="your@email.com"
          // autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={accountIdError ? "error" : "primary"}
        />
      </FormControl>
      <FormControl style={{ display: "flex" }}>
        <TextField
          label="Account id"
          error={accountIdError}
          helperText={accountIdErrorMessage}
          id="account-id"
          type="text"
          name="account-id"
          // placeholder="your@email.com"
          // autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          // color={emailError ? "error" : "primary"}
        />
        <Button
          type="button"
          variant="contained"
          onClick={handleAccountIdCheck}
        >
          <Typography variant="body2">중복확인</Typography>
        </Button>
      </FormControl>

      {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        aria-disabled={isPending}
      >
        Sign Up
      </Button>
      {errorMessage && (
        <>
          <ExclamationCircleIcon />
          <p>{errorMessage}</p>
        </>
      )}
    </Box>
  );
};

export default SignUpForm;
