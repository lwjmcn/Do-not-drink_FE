import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import AnnouncementRoundedIcon from "@mui/icons-material/AnnouncementRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { FriendStatusType } from "public/type/friend_status";
import NotificationItem from "./NotificationItem";
import EmptyNotification from "./Empty";

interface NotificationData {
  friendRequestId: number;
  userId: number;
  nickname: string;
  accountId: string;
  status: FriendStatusType;
}

const emtpyList = [];
const friendReqList: NotificationData[] = [
  {
    friendRequestId: 1,
    userId: 1,
    nickname: "이예진",
    accountId: "yeyin",
    status: FriendStatusType.READ,
  },
  {
    friendRequestId: 2,
    userId: 2,
    nickname: "이예진",
    accountId: "yeyin",
    status: FriendStatusType.NOREAD,
  },
  {
    friendRequestId: 3,
    userId: 3,
    nickname: "이예진",
    accountId: "yeyin",
    status: FriendStatusType.NOREAD,
  },
];

export default function NotificationList() {
  const sortNoread = (a: NotificationData, b: NotificationData) => {
    if (
      a.status === FriendStatusType.NOREAD &&
      b.status !== FriendStatusType.NOREAD
    ) {
      return -1; // a가 더 우선
    } else if (
      a.status !== FriendStatusType.NOREAD &&
      b.status === FriendStatusType.NOREAD
    ) {
      return 1; // b가 더 우선
    } else {
      return 0; // 같음
    }
  };

  if (emtpyList.length === 0) {
    return <EmptyNotification />;
  } else {
    return (
      <Stack
        component={"ol"}
        direction={"column"}
        spacing={1}
        sx={{ marginTop: 6 }}
      >
        {friendReqList.sort(sortNoread).map((item) => (
          <NotificationItem
            key={item.friendRequestId}
            friendRequestId={item.friendRequestId}
            userId={item.userId}
            nickname={item.nickname}
            accountId={item.accountId}
            status={item.status}
          />
        ))}
      </Stack>
    );
  }
}
