import ResponseCode from "public/type/response_code";
import ResponseMessage from "public/type/response_message";

export default interface ResponseDto {
  code: ResponseCode;
  message: ResponseMessage;
}

export type ResponseBody<T> = T | ResponseDto | null;
