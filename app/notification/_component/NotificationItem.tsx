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
import { StatusType } from "public/type/status";
import { stat } from "fs";

interface NotificationItemProps {
  friendRequestId: number;
  userId: number;
  nickname: string;
  accountId: string;
  status: StatusType;
}
export default function NotificationItem({
  friendRequestId,
  userId,
  nickname,
  accountId,
  status,
}: NotificationItemProps) {
  return (
    <ListItem
      sx={{
        bgcolor: "#FFE6AC",
        borderRadius: 2,
        opacity: status !== StatusType.NOREAD ? 0.6 : 1,
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
          invisible={status !== StatusType.NOREAD}
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
            <span style={{ fontWeight: "600" }}>이예진</span> 님이 친구 요청을
            보냈어요
          </Typography>
        </Badge>

        {/* 이예진 님과 친구가 되었습니다 */}

        <Typography variant="caption" color="#717171">
          2023.03.12 03:12:44
        </Typography>
      </ListItemText>
      <Stack direction={"row"} spacing={1}>
        <Button
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
