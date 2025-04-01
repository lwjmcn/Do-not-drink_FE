import axiosInstance from "public/util/axios";
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

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`;

export const getReceivedFriendRequests = async () => {
  const result = await axiosInstance
    .get(`${API_URL}/friend_requests/received`)
    .then(responseHandler<FriendReqListResponseDto>)
    .catch(errorHandler);
  return result;
};

export const requestFriend = async (requestBody: FriendReqRequestDto) => {
  const result = await axiosInstance
    .post(`${API_URL}/friend-requests/`, requestBody)
    .then(responseHandler<FriendReqResponseDto>)
    .catch(errorHandler);
  return result;
};

export const friendRequestSubscribe = () => {
  const eventSource = new EventSource(`${API_URL}/friend-requests/`);

  eventSource.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("FriendRequestEvent data:", data);
  });

  eventSource.onerror = (error) => {
    console.error("Error occurred:", error);
    eventSource.close(); // Close the connection on error
  };
}; // TODO sse

export const respondToFriendRequest = async (
  requestId: number,
  requestBody: FriendReqResRequestDto
) => {
  const result = await axiosInstance
    .patch(`${API_URL}/friend-requests/${requestId}`, requestBody)
    .then(responseHandler<FriendReqResResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getFriends = async () => {
  const result = await axiosInstance
    .get(`${API_URL}/friends/`)
    .then(responseHandler<FriendshipListResponseDto>)
    .catch(errorHandler);
  return result;
};
