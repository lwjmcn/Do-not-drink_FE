import AlertModal from "@component/AlertModal";
import { Typography } from "@mui/material";

export default function AddExpenseCompleteModal() {
  return (
    <AlertModal>
      <Typography variant="h6" color="#717171" textAlign="center">
        <span style={{ color: "#FE9600" }}>지출 내역이</span> 추가됐어요
      </Typography>
    </AlertModal>
  );
}
