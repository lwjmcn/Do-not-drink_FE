import { TextField } from "@mui/material";
import InfoLayout from "./InfoLayout";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { UserInfo } from "./MyPage";

interface SettingListProps {
  user: UserInfo;
}

export default function SettingList({ user }: SettingListProps) {
  return (
    <InfoLayout title="내 정보" icon={<SettingsRoundedIcon />}>
      <TextField
        variant="standard"
        disabled
        label="닉네임"
        defaultValue={user.nickname}
        fullWidth
        margin="normal"
      />
      <TextField
        variant="standard"
        disabled
        label="아이디"
        defaultValue={user.id}
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
    </InfoLayout>
  );
}
