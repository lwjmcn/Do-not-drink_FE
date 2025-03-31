import { AxiosResponse, AxiosError } from "axios";
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
import {
  FriendReqListResponseDto,
  FriendReqResponseDto,
  FriendReqResResponseDto,
  FriendshipListResponseDto,
} from "./response/friend.response.dto";
import {
  FriendReqRequestDto,
  FriendReqResRequestDto,
} from "./request/friend.request.dto";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

export const getReceivedFriendRequests = async () => {
  const result = await axiosInstance
    .get(`${API_URL}/users/me/friend_requests/received`)
    .then(responseHandler<FriendReqListResponseDto>)
    .catch(errorHandler);
  return result;
};

export const requestFriend = async (requestBody: FriendReqRequestDto) => {
  const result = await axiosInstance
    .post(`${API_URL}/users/me/friend-requests`, requestBody)
    .then(responseHandler<FriendReqResponseDto>)
    .catch(errorHandler);
  return result;
};

export const friendRequestSubscribe = async () => {
  const result = await axiosInstance.get(`${API_URL}/users/me/friend-requests`);
  // TODO sse emitter

  return;
};

export const respondToFriendRequest = async (
  requestId: number,
  requestBody: FriendReqResRequestDto
) => {
  const result = await axiosInstance
    .patch(`${API_URL}/users/me/friend-requests/${requestId}`, requestBody)
    .then(responseHandler<FriendReqResResponseDto>)
    .catch(errorHandler);
  // TODO sse emitter
  return;
};

export const getFriends = async () => {
  const result = await axiosInstance
    .get(`${API_URL}/users/me/friends`)
    .then(responseHandler<FriendshipListResponseDto>)
    .catch(errorHandler);
  return result;
};
