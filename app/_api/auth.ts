import axios from "axios";
import { SocialLoginType } from "public/type/social_login";
import {
  AccountIdCheckRequestDto,
  EmailVerificationRequestDto,
  CheckVerificationRequestDto,
  SignUpRequestDto,
  SignInRequestDto,
  OAuthSignUpRequestDto,
} from "./request/auth.request.dto";
import {
  AccountIdCheckResponseDto,
  CheckVerificationResponseDto,
  EmailVerificationResponseDto,
  SignUpResponseDto,
  SignInResponseDto,
  OAuthSignUpResponseDto,
} from "./response/auth.response.dto";
import { responseHandler, errorHandler } from "./api";

const AUTH_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth`;

export const SnsSignInURL = (type: SocialLoginType) =>
  `${AUTH_API_URL}/oauth2/${type}`;

export const accountIdCheckRequest = async (
  requestBody: AccountIdCheckRequestDto
) => {
  const result = await axios
    .post(`${AUTH_API_URL}/account-id-check`, requestBody)
    .then(responseHandler<AccountIdCheckResponseDto>)
    .catch(errorHandler);
  return result;
};

export const emailVerificationRequest = async (
  requestBody: EmailVerificationRequestDto
) => {
  const result = await axios
    .post(`${AUTH_API_URL}/email-verification`, requestBody)
    .then(responseHandler<EmailVerificationResponseDto>) // NO_EMAIL or MAIN_SEND_FAIL
    .catch(errorHandler);
  return result;
};

export const checkVerificationRequest = async (
  requestBody: CheckVerificationRequestDto
) => {
  const result = await axios
    .post(`${AUTH_API_URL}/check-verification`, requestBody)
    .then(responseHandler<CheckVerificationResponseDto>) // NO_EMAIL or VERIFICATION_FAIL
    .catch(errorHandler);
  return result;
};

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios
    .post(`${AUTH_API_URL}/sign-up`, requestBody)
    .then(responseHandler<SignUpResponseDto>)
    .catch(errorHandler);
  return result;
};

export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios
    .post(`${AUTH_API_URL}/sign-in`, requestBody)
    .then(responseHandler<SignInResponseDto>)
    .catch(errorHandler);
  return result;
};

export const oauth2SignUpRequest = async (
  requestBody: OAuthSignUpRequestDto
) => {
  const result = await axios
    .post(`${AUTH_API_URL}/oauth-sign-up`, requestBody, {
      withCredentials: true, // HttpSession 전달
    })
    .then(responseHandler<OAuthSignUpResponseDto>)
    .catch(errorHandler);
  return result;
};
