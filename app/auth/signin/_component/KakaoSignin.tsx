import { Button } from "@mui/material";
import { SnsSignInURL } from "app/_api/auth";
import { SocialLoginType } from "public/type/social_login";
import KakaoIcon from "public/image/kakao.svg";

const KakaoSignin = () => {
  return (
    <form action={SnsSignInURL(SocialLoginType.KAKAO)}>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ bgcolor: "#FEE500", color: "rgba(0,0,0,0.85)" }}
        // onClick={() => onSnsSignIn(SocialLoginType.KAKAO)}
        startIcon={<KakaoIcon />}
      >
        Sign in with Kakao
      </Button>
    </form>
  );
};
export default KakaoSignin;
