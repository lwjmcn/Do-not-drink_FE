import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { setCookie } from "cookies-next";

const OAuthSignIn = () => {
  const { token, expirationTime } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!token || !expirationTime) return;

    const now = new Date().getTime() * 1000;
    const expires = new Date(now + Number(expirationTime));

    setCookie("accessToken", token, { expires, path: "/" });
    router.replace("/home");
  }, [token]);
};

export default OAuthSignIn;
