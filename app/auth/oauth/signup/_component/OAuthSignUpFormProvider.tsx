"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { oauth2SignUpRequest } from "app/_api/auth";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useRouter } from "next/navigation";
import { OAuthSignUpResponseDto } from "app/_api/response/auth.response.dto";
import { SocialLoginType } from "public/type/social_login";
import { saveToken } from "public/util/cookies";

const accountIdPattern = /^[a-zA-Z0-9]{4,20}$/;
const oauthSignUpFormSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, { message: "닉네임을 입력해주세요." })
    .max(20, { message: "20자 이내로 입력해주세요." }),
  accountId: z
    .string()
    .trim()
    .min(1, { message: "아이디를 입력해주세요." })
    .min(4, { message: "4자 이상 입력해주세요." })
    .max(20, { message: "20자 이내로 입력해주세요." })
    .regex(accountIdPattern, {
      message: "영문 또는 숫자만 입력할 수 있습니다.",
    }),
  socialLoginType: z.nativeEnum(SocialLoginType),
  themeId: z.number().int().positive(),
tokenId: z.string().trim().min(1, { message: "인증 정보가 없습니다." }),
});

type IOAuthSignUpForm = z.infer<typeof oauthSignUpFormSchema>;

const defaultValues: IOAuthSignUpForm = {
  nickname: "",
  accountId: "",
  socialLoginType: SocialLoginType.KAKAO,
  themeId: 1,
  tokenId: "",
};

const OAuthSignUpFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useForm<IOAuthSignUpForm>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(oauthSignUpFormSchema),
  });
  const { handleSubmit } = form;

  const router = useRouter();
  const oauth2SignUpResponse = (
    responseBody: ResponseBody<OAuthSignUpResponseDto>
  ): void => {
    if (!responseBody) return;
    const { code, token, expirationTime } =
      responseBody as OAuthSignUpResponseDto;

    let message = "";
    if (code == ResponseCode.DUPLICATE_ID)
      message = "이미 존재하는 아이디입니다.";
    // if (code == ResponseCode.NO_SESSION_INFO)
    //   message = "세션이 만료되었습니다.";
    if (code == ResponseCode.DATABASE_ERROR)
      message = "데이터베이스 오류입니다.";
    if (code == ResponseCode.SUCCESS) {
      message = "회원가입이 완료되었습니다.";

      alert(message);
      saveToken(token, expirationTime);
      router.push("/home");
      return;
    }
    alert(message);
    router.push("/auth/signin");
  };
  const onSubmit = async (data: IOAuthSignUpForm) => {
    console.log(data);
    alert(JSON.stringify(data));

    await oauth2SignUpRequest(data).then(oauth2SignUpResponse);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default OAuthSignUpFormProvider;
