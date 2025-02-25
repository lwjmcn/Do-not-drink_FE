"use client";

import { Box, FormControl, TextField, Button, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OAuthSignUp = () => {
  const [nickname, setNickname] = useState("");
  const [accountId, setAccountId] = useState("");

  const params = useSearchParams();

  useEffect(() => {
    setNickname(params.get("nickname") ?? "");
    setAccountId(params.get("accountId") ?? "");
  }, []);

  return (
    <div>
      <Box
        component="form"
        // action={formAction}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 0.5,
        }}
      >
        <FormControl>
          <TextField
            label="Nickname"
            // error={emailError}
            // helperText={emailErrorMessage}
            id="nickname"
            type="text"
            name="nickname"
            value={nickname}
            // placeholder="your@email.com"
            // autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            // color={accountIdError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl style={{ display: "flex" }}>
          <TextField
            label="Account id"
            value={accountId}
            // error={accountIdError}
            // helperText={accountIdErrorMessage}
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
            // onClick={handleAccountIdCheck}
          >
            <Typography variant="body2">중복확인</Typography>
          </Button>
        </FormControl>

        {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          // aria-disabled={isPending}
        >
          Sign Up
        </Button>
        {/* {errorMessage && (
          <>
            <ExclamationCircleIcon />
            <p>{errorMessage}</p>
          </>
        )} */}
      </Box>
    </div>
  );
};
export default OAuthSignUp;
