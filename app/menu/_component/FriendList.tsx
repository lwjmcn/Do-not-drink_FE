import React, { useEffect, useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InfoLayout from "./InfoLayout";
import { getFriends } from "app/_api/friend";
import {
  FriendDto,
  FriendshipListResponseDto,
} from "app/_api/response/friend.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";

export default function FriendList() {
  const [friends, setFriends] = useState<FriendDto[]>([]);

  const getFriendsApi = async () => {
    await getFriends().then(getFriendsApiResponse);
  };
  const getFriendsApiResponse = (
    responseBody: ResponseBody<FriendshipListResponseDto>
  ) => {
    if (!responseBody) return;

    const { code, message, friends } =
      responseBody as FriendshipListResponseDto;

    if (code == ResponseCode.SUCCESS) {
      setFriends(friends);
    } else {
      console.log("getFriends: ", message);
    }
  };

  useEffect(() => {
    getFriendsApi();
  }, []);

  return (
    <InfoLayout title={"친구 목록"} icon={<PersonIcon />}>
      <List>
        {friends.length === 0 ? (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", padding: "20px", color: "#717171" }}
          >
            아직 친구가 없어요.
          </Typography>
        ) : (
          friends.map((friend) => (
            <ListItem
              key={friend.userId}
              sx={{
                borderRadius: "12px",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar alt={friend.accountId}>
                  {friend.nickname.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={friend.nickname}
                secondary={`@${friend.accountId}`}
              />
            </ListItem>
          ))
        )}
      </List>
    </InfoLayout>
  );
}
