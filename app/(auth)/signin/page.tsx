import { Box, Button, Divider, Link, Typography } from "@mui/material";
import GoogleIcon from "public/image/google.svg";
import KakaoIcon from "public/image/kakao.svg";
import CredentialsForm from "../_component/CredentialsForm";
import { signIn } from "auth";

const SignIn = () => {
  // const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
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
      <Divider>
        <Typography color="textDisabled">or</Typography>
      </Divider>
      {/* Email Sign in */}
      <CredentialsForm />
      {/* Sign up */}
      <Typography sx={{ textAlign: "center" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
          Sign up
        </Link>
      </Typography>
    </>
  );
};
export default SignIn;
