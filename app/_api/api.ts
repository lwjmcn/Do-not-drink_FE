import { AxiosResponse, AxiosError } from "axios";
import { NextResponse } from "next/server";
import ResponseCode from "public/type/response_code";
import ResponseDto from "./response/response_dto";

export const responseHandler = <T>(response: AxiosResponse) => {
  const responseBody: T = response.data;

  const { code } = responseBody as ResponseDto;
  if (code == ResponseCode.NO_PERMISSION) {
    NextResponse.redirect("/auth/signin", 401);
  }

  return responseBody;
};

export const errorHandler = (error: AxiosError) => {
  if (!error.response || !error.response.data) return null;
  return error.response.data as ResponseDto;
};
