"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpRequest } from "app/_api/auth/auth";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useRouter } from "next/navigation";
import { SignUpResponseDto } from "app/_api/response/auth.response.dto";

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;
const accountIdPattern = /^[a-zA-Z0-9]{4,20}$/;

const signUpFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "이메일을 입력해주세요" })
      .email({ message: "이메일 형식이 아닙니다." }),
    password: z
      .string()
      .trim()
      .min(1, { message: "비밀번호를 입력해주세요." })
      .regex(passwordPattern, {
        message: "영문, 숫자를 포함해 8-13자리로 입력해주세요.",
      }),
    passwordCheck: z
      .string()
      .trim()
      .min(1, { message: "비밀번호를 확인해주세요." })
      .max(15),
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
    themeId: z.number().int().positive(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호를 다시 확인해주세요",
  });

export type ISignUpForm = z.infer<typeof signUpFormSchema>;

const defaultValues: ISignUpForm = {
  email: "",
  password: "",
  passwordCheck: "",
  nickname: "",
  accountId: "",
  themeId: 1,
};

const SignUpFormProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<ISignUpForm>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(signUpFormSchema),
  });
  const { handleSubmit } = form;

  const router = useRouter();
  const signUpResponse = (
    responseBody: ResponseBody<SignUpResponseDto>
  ): void => {
    if (!responseBody) return;
    const { code } = responseBody;

    let message = "";
    if (code == ResponseCode.DUPLICATE_ID)
      message = "이미 존재하는 아이디입니다.";
    if (code == ResponseCode.DUPLICATE_EMAIL)
      message = "이미 회원으로 가입된 이메일입니다.";
    if (code == ResponseCode.DATABASE_ERROR)
      message = "데이터베이스 오류입니다.";
    if (code == ResponseCode.SUCCESS) {
      message = "회원가입이 완료되었습니다.";
    }

    alert(message);
    router.push("/signin");
  };
  const onSubmit = async (data: ISignUpForm) => {
    console.log(data);
    alert(JSON.stringify(data));

    // data omitting passwordCheck
    const { passwordCheck, ...dataWithoutPasswordCheck } = data;
    await signUpRequest(dataWithoutPasswordCheck).then(signUpResponse);
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

export default SignUpFormProvider;
