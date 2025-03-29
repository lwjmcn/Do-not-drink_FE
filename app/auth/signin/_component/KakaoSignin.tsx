import { Button, Typography } from "@mui/material";
import { SnsSignInURL } from "app/_api/auth";
import { SocialLoginType } from "public/type/social_login";
import KakaoIcon from "public/image/kakao.svg";

const KakaoSignin = () => {
  return (
    <form action={SnsSignInURL(SocialLoginType.KAKAO)}>
      <Button
        type="submit"
        fullWidth
        variant="text"
        sx={{ bgcolor: "#FEE500" }}
        startIcon={<KakaoIcon />}
      >
        <Typography variant="button" color="#000">
          카카오톡으로 로그인 하기
        </Typography>
      </Button>
    </form>
  );
};
export default KakaoSignin;
