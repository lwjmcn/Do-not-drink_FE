import { SocialLoginType } from "public/type/social_login";

export interface AccountIdCheckRequestDto {
  accountId: string;
}
export interface CheckVerificationRequestDto {
  email: string;
  verificationCode: string;
}
export interface EmailVerificationRequestDto {
  email: string;
}
export interface OAuthSignUpRequestDto {
  accountId: string;
  nickname: string;
  socialLoginType: SocialLoginType;
  themeId: number;
}
export interface SignInRequestDto {
  email: string;
  password: string;
}
export interface SignUpRequestDto {
  email: string;
  password: string;
  nickname: string;
  accountId: string;
  themeId: number;
}
