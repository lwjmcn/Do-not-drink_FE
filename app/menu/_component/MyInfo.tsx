import { Stack, Avatar, Box, Typography, Skeleton } from "@mui/material";
import { UserDto } from "app/_api/response/user.response.dto";

interface MyInfoProps {
  user: UserDto | null;
}
export default function MyInfo({ user }: MyInfoProps) {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      padding={3}
      spacing={2}
      sx={{ background: "linear-gradient(45deg, #FFBD5D 30%, #FFE6AC 90%)" }}
    >
      {user == null ? (
        <Skeleton variant="circular" width={80} height={80} />
      ) : (
        <Avatar
          alt={user?.nickname}
          sx={{
            width: 80,
            height: 80,
            border: "2px solid white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {user?.nickname.charAt(0)}
        </Avatar>
      )}
      <Box sx={{ textAlign: "center", color: "#fff" }}>
        {user == null ? (
          <Skeleton variant="text" sx={{ fontSize: 20, width: 100 }} />
        ) : (
          <Typography variant="h5" fontWeight="bold">
            {user?.nickname}
          </Typography>
        )}
        {user == null ? (
          <Skeleton variant="text" sx={{ fontSize: 14, width: 100 }} />
        ) : (
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            @{user?.accountId}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
