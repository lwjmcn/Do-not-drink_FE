import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import GoogleIcon from "public/image/google.svg";
import KakaoIcon from "public/image/kakao.svg";
import SigninForm from "./_component/SignInForm";
import Link from "next/link";
import { signIn } from "auth";
import { SocialLoginType } from "public/type/social_login";
import { SnsSignInURL } from "app/_api/auth";

const SignIn = () => {
  // const [alertOpen, setAlertOpen] = useState(false);

  const snsSignIn = async (type: SocialLoginType) => {
    window.location.href = SnsSignInURL(type);
  };

  return (
    <Stack direction={"column"} gap={2}>
      {/* <NotReadyAlert open={alertOpen} onClose={() => setAlertOpen(false)} /> */}
      <Typography variant="h2">Sign in</Typography>
      {/* SNS Sign in */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("kakao", {
              // redirect: tr
            });
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ bgcolor: "#FEE500", color: "rgba(0,0,0,0.85)" }}
            // onClick={() => setAlertOpen(true)}
            startIcon={<KakaoIcon />}
          >
            Sign in with Kakao
          </Button>
        </form>
      </Box>
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
