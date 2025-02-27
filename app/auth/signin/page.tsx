import { Box, Divider, Stack, Typography } from "@mui/material";
import SigninForm from "./_component/SignInForm";
import Link from "next/link";
import { SocialLoginType } from "public/type/social_login";
import { SnsSignInURL } from "app/_api/auth";
import KakaoSignin from "./_component/KakaoSignin";

const SignIn = () => {
  const onSnsSignIn = (type: SocialLoginType) => {
    window.location.href = SnsSignInURL(type);
  };

  return (
    <Stack direction={"column"} gap={2}>
      <Typography variant="h2">Sign in</Typography>

      {/* SNS Sign in */}
      <KakaoSignin />

      <Divider sx={{ marginY: 4 }}>
        <Typography color="textDisabled">or</Typography>
      </Divider>

      {/* Email Sign in */}
      <SigninForm />

      {/* Sign up */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={"4px"}
      >
        <Typography>계정이 없으신가요?</Typography>
        <Link
          href="/auth/signup"
          style={{ alignSelf: "center", textDecorationLine: "underline" }}
        >
          <Typography variant="body2">이메일로 회원가입</Typography>
        </Link>
      </Stack>

      {/* TODO: 비밀번호 찾기 */}
      {/* <Link
        href="/forgot-password"
        style={{ alignSelf: "center", textDecorationLine: "underline" }}
      >
        <Typography>Forgot your password?</Typography>
      </Link> */}
    </Stack>
  );
};
export default SignIn;
