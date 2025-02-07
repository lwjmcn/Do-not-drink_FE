"use client";

import { useActionState, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  Link,
  TextField,
} from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ExclamationCircleIcon from "@mui/icons-material/InfoRounded";
import { useSearchParams } from "next/navigation";
import { authenticate } from "app/_lib/signin";

const CredentialsForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {/* forgot password? */}
        <Link
          component="button"
          type="button"
          onClick={() => {}}
          variant="body2"
          sx={{ alignSelf: "center" }}
        >
          Forgot your password?
        </Link>
      </Box>
      {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        aria-disabled={isPending}
      >
        Sign in
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

export default CredentialsForm;
