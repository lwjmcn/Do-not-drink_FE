import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "public/util/axios";
import ResponseDto from "./response/response_dto";

const USER_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`;

const responseHandler = <T>(response: AxiosResponse) => {
  const responseBody: T = response.data;
  return responseBody;
};
const errorHandler = (error: AxiosError) => {
  if (!error.response || !error.response.data) return null;
  return error.response.data as ResponseDto;
};

export const signOutRequest = async () => {
  const result = await axiosInstance
    .post(`${USER_API_URL}/logout`)
    .then(responseHandler<ResponseDto>)
    .catch(errorHandler);
  return result;
};
