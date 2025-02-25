import AccountIdCheckRequestDto from "../request/auth/account-id-check.request.dto";
import AccountIdCheckResponseDto from "../response/auth/account-id-check.response.dto";
import axios, { AxiosError, AxiosResponse } from "axios";
import ResponseDto from "../response/response_dto";
import { SocialLoginType } from "public/type/social_login";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth`;

const responseHandler = <T>(response: AxiosResponse) => {
  const responseBody: T = response.data;
  return responseBody;
};
const errorHandler = (error: AxiosError) => {
  if (!error.response || !error.response.data) return null;
  return error.response.data as ResponseDto;
};

export const accountIdCheckRequest = async (
  requestBody: AccountIdCheckRequestDto
) => {
  const result = await axios
    .post(`${API_URL}/account-id-check`, requestBody)
    .then(responseHandler<AccountIdCheckResponseDto>)
    .catch(errorHandler);
  return result;
};

export const SnsSignInURL = (type: SocialLoginType) =>
  `${API_URL}/oauth2/${type}`;
