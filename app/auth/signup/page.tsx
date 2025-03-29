import { Typography, Stack } from "@mui/material";
import Link from "next/link";
import EmailSignUpForm from "./_component/EmailSignUpForm";
import BackButton from "@component/BackButton";

const SignUp = () => {
  return (
    <>
      <BackButton />
      <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
        <Typography variant="h4" alignSelf={"center"} color="#717171">
          사용하실 <span style={{ color: "#FE9600" }}>이메일</span>을 알려주세요
        </Typography>

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
    </>
  );
};

export default SignUp;
