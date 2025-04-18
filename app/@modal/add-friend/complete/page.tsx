import AlertModal from "@component/AlertModal";
import { Typography } from "@mui/material";

export default function AddFriendCompleteModal() {
  return (
    <AlertModal>
      <Typography variant="h6" color="#717171" textAlign="center">
        <span style={{ color: "#FE9600" }}>친구 요청</span>을 보냈어요
      </Typography>
    </AlertModal>
  );
}
