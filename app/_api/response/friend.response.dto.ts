import { FriendStatusType } from "public/type/friend_status";
import ResponseDto from "./response_dto";

export interface FriendReqDto {
  requestId: number;
  userId: string; // request sender
  nickname: string;
  accountId: string;
  status: FriendStatusType;
}
export interface FriendReqListResponseDto extends ResponseDto {
  friendRequests: FriendReqDto[];
} // 받은 친구요청 리스트

export interface FriendReqResponseDto extends ResponseDto {} // 친구요청

export interface FriendReqResResponseDto extends ResponseDto {} // 친구요청 수락/거절

export interface FriendDto {
  userId: number;
  nickname: string;
  accountId: string;
  fileUrl: string;
  remainingRate: number;
}
export interface FriendshipListResponseDto extends ResponseDto {
  friends: FriendDto[];
} // 친구 리스트
