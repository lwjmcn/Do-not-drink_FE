import axios from "axios";
import { responseHandler, errorHandler } from "./api";
import { ThemeFindAllResponseDto } from "./response/theme.response.dto";

const THEME_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/themes`;

export const getAllThemes = async () => {
  const result = await axios
    .get(`${THEME_API_URL}/`)
    .then(responseHandler<ThemeFindAllResponseDto>)
    .catch(errorHandler);
  return result;
};
