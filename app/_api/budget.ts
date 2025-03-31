import axiosInstance from "public/util/axios";
import ResponseDto from "./response/response_dto";
import {
  BudgetSetRequestDto,
  ReactToRequestDto,
} from "./request/budget.request.dto";
import {
  BudgetSetResponseDto,
  ReactToResponseDto,
} from "./response/budget.response.dto";
import { responseHandler, errorHandler } from "./api";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

export const getRemainingBudget = async () => {
  const result = await axiosInstance
    .get(`${API_URL}/users/me/budgets/current/remains`)
    .then(responseHandler<ResponseDto>)
    .catch(errorHandler);
  return result;
};

export const setBudget = async (requestBody: BudgetSetRequestDto) => {
  const result = await axiosInstance
    .post(`${API_URL}/users/me/budgets/current`, requestBody)
    .then(responseHandler<BudgetSetResponseDto>)
    .catch(errorHandler);
  return result;
};

export const subscribeMyReaction = async () => {
  const result = await axiosInstance.get(
    `${API_URL}/users/me/budgets/current/reactions`
  );
  // TODO sse emitter

  return;
};

export const subscribeReaction = async (friendId: number) => {
  const result = await axiosInstance.get(
    `${API_URL}/users/${friendId}/budgets/current/reactions`
  );
  // TODO sse emitter
  return;
};

export const sendReaction = async (
  friendId: number,
  requestBody: ReactToRequestDto
) => {
  const result = await axiosInstance
    .post(`${API_URL}/users/${friendId}/budgets/current/reactions`, requestBody)
    .then(responseHandler<ReactToResponseDto>)
    .catch(errorHandler);
  return result;
};
