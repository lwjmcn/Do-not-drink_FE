import AlertModal from "@component/AlertModal";
import { Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

export default function SetBudgetFailModal() {
  return (
    <AlertModal>
      <ErrorOutlineRoundedIcon
        style={{ fontSize: 60, color: "#FE9600", marginBottom: 20 }}
      />
      <Typography variant="h6" color="#717171">
        이번 달에는 이미
        <span style={{ color: "#FE9600" }}>예산</span>을 설정했어요!
      </Typography>
    </AlertModal>
  );
}
