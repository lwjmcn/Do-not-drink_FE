"use client";

import { useParams, useRouter } from "next/navigation";
import { saveToken } from "public/util/cookies";
import { useEffect } from "react";

const OAuthSignIn = () => {
  const { token, expirationTime } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!token || !expirationTime) return;
    saveToken(token as string, Number(expirationTime));
    router.push("/home");
  }, [token]);
};

export default OAuthSignIn;
