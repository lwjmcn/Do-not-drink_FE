"use client";

import { Typography, Stack } from "@mui/material";
import { OAuthSignUpRequestDto } from "app/_api/request/auth.request.dto";
import ProfileForm from "app/auth/_component/ProfileForm";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const OAuthSignUp = () => {
  const params = useSearchParams();
  const { setValue } = useFormContext<OAuthSignUpRequestDto>();

  useEffect(() => {
    setValue("nickname", params.get("nickname") ?? "");
    setValue("accountId", params.get("accountId") ?? "");
  }, []);

  return (
    <Stack direction={"column"} spacing={2}>
      <Typography variant="h2">Add your profile</Typography>

      {/* Additional Info (nickname, account-id) */}
      <ProfileForm isSocial={true} />
    </Stack>
  );
};
export default OAuthSignUp;
