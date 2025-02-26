import ResponseDto from "./response_dto";

export interface AccountIdCheckResponseDto extends ResponseDto {}

export interface CheckVerificationResponseDto extends ResponseDto {}

export interface EmailVerificationResponseDto extends ResponseDto {}

export interface OAuthSignUpResponseDto extends ResponseDto {
  token: string;
  expirationTime: number;
}

export interface SignInResponseDto extends ResponseDto {
  token: string;
  expirationTime: number;
}

export interface SignUpResponseDto extends ResponseDto {}
