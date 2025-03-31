import React from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InfoLayout from "./InfoLayout";
import { Friend } from "./MyPage";

export default function FriendList({ friends }: { friends: Friend[] }) {
  return (
    <InfoLayout title={"친구 목록"} icon={<PersonIcon />}>
      <List>
        {friends.map((friend) => (
          <ListItem
            key={friend.id}
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
              <Avatar src={friend.avatar}>
                {!friend.avatar && friend.nickname.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={friend.nickname}
              secondary={`@${friend.accountId}`}
            />
          </ListItem>
        ))}
      </List>
    </InfoLayout>
  );
}
