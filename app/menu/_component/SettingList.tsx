import { CircularProgress, Skeleton, TextField } from "@mui/material";
import InfoLayout from "./InfoLayout";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { UserDto } from "app/_api/response/user.response.dto";

interface SettingListProps {
  user: UserDto | null;
}

export default function SettingList({ user }: SettingListProps) {
  return (
    <InfoLayout title="내 정보" icon={<SettingsRoundedIcon />}>
      {user == null ? (
        <Skeleton variant="rounded" width="100%" height={120} />
      ) : (
        <>
          <TextField
            variant="standard"
            disabled
            label="닉네임"
            defaultValue={user?.nickname}
            fullWidth
            margin="normal"
          />
          <TextField
            variant="standard"
            disabled
            label="아이디"
            defaultValue={user?.accountId}
            fullWidth
            margin="normal"
          />

          <TextField
            variant="standard"
            disabled
            label="테마"
            defaultValue={"오렌지주스"}
            fullWidth
            margin="normal"
          />
        </>
      )}
    </InfoLayout>
  );
}
