import ResponseDto from "./response_dto";

export interface UserDto {
  nickname: string;
  accountId: string;
  fileUrl: string;
  themeColor: string;
}
export interface UserMeResponseDto extends ResponseDto {
  user: UserDto;
}
