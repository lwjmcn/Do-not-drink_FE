import ResponseDto from "./response_dto";

export interface ThemeDto {
  themeId: number;
  name: string;
  description: string;
  color: string;
  fileUrl: string;
}
export interface ThemeFindAllResponseDto extends ResponseDto {}
