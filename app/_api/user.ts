import axiosInstance from "public/util/axios";
import ResponseDto from "./response/response_dto";
import { responseHandler, errorHandler } from "./api";
import { UserMeResponseDto } from "./response/user.response.dto";

const USER_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`;

export const signOutRequest = async () => {
  const result = await axiosInstance
    .post(`${USER_API_URL}/logout`)
    .then(responseHandler<ResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getCurrentUser = async () => {
  const result = await axiosInstance
    .get(`${USER_API_URL}`)
    .then(responseHandler<UserMeResponseDto>)
    .catch(errorHandler);
  return result;
};
