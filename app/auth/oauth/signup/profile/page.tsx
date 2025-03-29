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
  }, [params, setValue]);

  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <div
        style={{
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" alignSelf={"center"} color="#717171">
          <span style={{ color: "#FE9600" }}>프로필</span>을 설정하세요
        </Typography>
        <Typography variant="body2" alignSelf={"center"} color="#717171">
          닉네임과 아이디는 친구들에게 보여지는 정보예요.
        </Typography>
      </div>

      {/* Additional Info (nickname, account-id) */}
      <ProfileForm isSocial={true} />
    </Stack>
  );
};
export default OAuthSignUp;
