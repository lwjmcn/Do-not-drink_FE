import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const OAuthSignIn = () => {
  const { token, expirationTime } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!token || !expirationTime) return;

    router.replace("/home");
  }, [token]);
};

export default OAuthSignIn;
