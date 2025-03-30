import AlertModal from "@component/AlertModal";
import { Typography } from "@mui/material";

export default function AddFriendCompleteModal() {
  return (
    <AlertModal>
      <Typography variant="h6" color="#717171" textAlign="center">
        <span style={{ color: "#FE9600" }}>새로운 친구가</span>
        <br /> 추가되었습니다!
      </Typography>
    </AlertModal>
  );
}
