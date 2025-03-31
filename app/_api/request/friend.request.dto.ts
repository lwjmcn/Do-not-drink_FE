import { FriendStatusType } from "public/type/friend_status";

export interface FriendReqRequestDto {
  receiverAccountId: string;
}
export interface FriendReqResRequestDto {
  status: FriendStatusType;
}
