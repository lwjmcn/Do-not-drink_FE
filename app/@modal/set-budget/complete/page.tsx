import AlertModal from "@component/AlertModal";
import { Typography } from "@mui/material";

export default function SetBudgetCompleteModal() {
  return (
    <AlertModal>
      <Typography variant="h6" color="#717171" textAlign="center">
        이번 달 <span style={{ color: "#FE9600" }}>예산</span>이 설정되었어요
      </Typography>
    </AlertModal>
  );
}
