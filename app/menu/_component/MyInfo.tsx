import { Stack, Avatar, Box, Typography } from "@mui/material";
import { UserInfo } from "./MyPage";

export default function MyInfo({ user }: { user: UserInfo }) {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      padding={3}
      spacing={2}
      sx={{ background: "linear-gradient(45deg, #FFBD5D 30%, #FFE6AC 90%)" }}
    >
      <Avatar
        src={user.avatar}
        alt={user.nickname}
        sx={{
          width: 80,
          height: 80,
          border: "2px solid white",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {!user.avatar && user.nickname.charAt(0)}
      </Avatar>
      <Box sx={{ textAlign: "center", color: "#fff" }}>
        <Typography variant="h5" fontWeight="bold">
          {user.nickname}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
          @{user.id}
        </Typography>
      </Box>
    </Stack>
  );
}
