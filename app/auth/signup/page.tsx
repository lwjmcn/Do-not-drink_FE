import { Typography, Box, Button, Divider, Stack } from "@mui/material";
import Link from "next/link";
import EmailSignUpForm from "./_component/EmailSignUpForm";

const SignUp = () => {
  return (
    <Stack direction={"column"} spacing={2}>
      <Typography variant="h2">Sign Up</Typography>

      {/* Email Sign Up */}
      <EmailSignUpForm />

      {/* Sign in */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={"4px"}
      >
        <Typography>계정이 이미 있으신가요?</Typography>
        <Link
          href="/auth/signin"
          style={{ alignSelf: "center", textDecorationLine: "underline" }}
        >
          <Typography variant="body2">로그인</Typography>
        </Link>
      </Stack>
    </Stack>
  );
};

export default SignUp;
