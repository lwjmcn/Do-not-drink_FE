import AlertModal from "@component/AlertModal";
import { Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

export default function AddFriendFailModal() {
  return (
    <AlertModal>
      <ErrorOutlineRoundedIcon
        style={{ fontSize: 60, color: "#FE9600", marginBottom: 20 }}
      />
      <Typography variant="h6" color="#717171">
        친구를 <span style={{ color: "#FE9600" }}>찾을 수 없어요</span>
      </Typography>
    </AlertModal>
  );
}
