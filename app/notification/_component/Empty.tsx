import NotificationImportantRoundedIcon from "@mui/icons-material/NotificationImportantRounded";
import { Stack, Typography } from "@mui/material";

export default function EmptyNotification() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      spacing={1}
      marginY={"auto"}
    >
      <NotificationImportantRoundedIcon
        sx={{
          fontSize: 64,
          color: "#717171",
          animation: "ring 0.3s",
          "@keyframes ring": {
            "0%": { transform: "rotate(0deg)" },
            "25%": { transform: "rotate(5deg)" },
            "50%": { transform: "rotate(-5deg)" },
            "75%": { transform: "rotate(5deg)" },
            "100%": { transform: "rotate(0deg)" },
          },
        }}
      />
      <Typography variant="h4" color="#717171">
        아직 알림이 없어요
      </Typography>
      <Typography variant="caption" color="#717171">
        친구들과 아이디를 공유해서 친구를 추가해보세요
      </Typography>
    </Stack>
  );
}
