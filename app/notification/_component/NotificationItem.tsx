import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Stack,
  Button,
  Badge,
} from "@mui/material";

import AnnouncementRoundedIcon from "@mui/icons-material/AnnouncementRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { FriendStatusType } from "public/type/friend_status";
import { stat } from "fs";
import { respondToFriendRequest } from "app/_api/friend";
import { FriendReqResRequestDto } from "app/_api/request/friend.request.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import { FriendReqResResponseDto } from "app/_api/response/friend.response.dto";
import ResponseCode from "public/type/response_code";

interface NotificationItemProps {
  friendRequestId: number;
  userId: number;
  nickname: string;
  accountId: string;
  status: FriendStatusType;
}
export default function NotificationItem({
  friendRequestId,
  userId,
  nickname,
  accountId,
  status,
}: NotificationItemProps) {
  const respondToFriendRequestApi = async (status: FriendStatusType) => {
    const data: FriendReqResRequestDto = {
      status: status,
    };
    await respondToFriendRequest(friendRequestId, data).then(
      respondToFriendRequestApiResponse
    );
  };
  const respondToFriendRequestApiResponse = (
    responseBody: ResponseBody<FriendReqResResponseDto>
  ) => {
    if (!responseBody) return;
    const { code, message } = responseBody as FriendReqResResponseDto;
    if (code == ResponseCode.SUCCESS) {
      console.log("수락했어욤욤");
    } else {
      console.log("respondToFriendRequest: ", message);
    }
  };

  return (
    <ListItem
      sx={{
        bgcolor: "#FFE6AC",
        borderRadius: 2,
        opacity: status !== FriendStatusType.NOREAD ? 0.6 : 1,
        gap: 1,
      }}
    >
      <ListItemAvatar sx={{ minWidth: 0 }}>
        <AnnouncementRoundedIcon style={{ fontSize: 16 }} />
        {/* <PersonAddRoundedIcon/> */}
      </ListItemAvatar>
      <ListItemText>
        <Badge
          variant="dot"
          invisible={status !== FriendStatusType.NOREAD}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#FE9600",
              translate: "4px 4px",
              minWidth: 5,
              height: 5,
            },
          }}
        >
          <Typography variant="body1" color="#000">
            <span style={{ fontWeight: "600" }}>{nickname}</span> 님이 친구
            요청을 보냈어요
          </Typography>
        </Badge>
        {/* {nickname} 님과 친구가 되었습니다 */}

        <Typography variant="caption" color="#717171">
          {`@${accountId}`}
        </Typography>
      </ListItemText>
      <Stack direction={"row"} spacing={1}>
        <Button
          onClick={() => respondToFriendRequestApi(FriendStatusType.ACCEPT)}
          variant="contained"
          sx={{
            minWidth: 28,
            height: 28,
            bgcolor: "#FE9600",
            boxShadow: 0,
            paddingX: 0,
          }}
        >
          <CheckRoundedIcon />
        </Button>
        <Button
          onClick={() => respondToFriendRequestApi(FriendStatusType.REJECT)}
          variant="outlined"
          sx={{
            minWidth: 28,
            height: 28,
            borderColor: "#FE9600",
            color: "#FE9600",
            paddingX: 0,
          }}
        >
          <ClearRoundedIcon />
        </Button>
      </Stack>
    </ListItem>
  );
}
