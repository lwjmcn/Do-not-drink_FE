import axiosInstance from "public/util/axios";
import ResponseDto from "./response/response_dto";
import {
  BudgetSetRequestDto,
  ReactToRequestDto,
} from "./request/budget.request.dto";
import {
  BudgetRemainingResponseDto,
  BudgetSetResponseDto,
  ReactToResponseDto,
} from "./response/budget.response.dto";
import { responseHandler, errorHandler } from "./api";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

export const getRemainingBudget = async () => {
  const result = await axiosInstance
    .get(`${API_URL}/users/me/budgets/current/remains`)
    .then(responseHandler<BudgetRemainingResponseDto>)
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

export const myReactionEventUrl = () =>
  `${API_URL}/users/me/budgets/current/reactions`;
export const subscribeMyReaction = async () => {
  const eventSource = new EventSource(
    `${API_URL}/users/me/budgets/current/reactions`
  );

  eventSource.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("MyReactionEvent data:", data);
  });

  eventSource.onerror = (error) => {
    console.error("Error occurred:", error);
    eventSource.close(); // Close the connection on error
  };
}; // TODO sse emitter

export const friendReactionEventUrl = (friendId: number) =>
  `${API_URL}/users/${friendId}/budgets/current/reactions`;
export const subscribeReaction = async (friendId: number) => {
  const eventSource = new EventSource(
    `${API_URL}/users/${friendId}/budgets/current/reactions`
  );

  eventSource.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("FriendReactionEvent data:", data);
  });

  eventSource.onerror = (error) => {
    console.error("Error occurred:", error);
    eventSource.close();
  };
}; // TODO sse emitter

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
