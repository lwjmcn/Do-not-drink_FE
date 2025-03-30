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
        입력해주신 값이
        <br />
        <span style={{ color: "#FE9600" }}>유효</span>하지 않아요
      </Typography>
    </AlertModal>
  );
}
