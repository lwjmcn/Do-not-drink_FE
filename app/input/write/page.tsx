import { Stack } from "@mui/material";
import Pencil from "@mui/icons-material/DriveFileRenameOutlineRounded";
import ExpenseForm from "../_component/ExpenseForm";
import ExpenseFormProvider from "../_component/ExpenseFormProvider";

export default function WritePage() {
  return (
    <Stack
      direction="column"
      spacing={4}
      marginY={"auto"}
      alignItems={"center"}
      marginX={2}
      padding={4}
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
      }}
    >
      <Pencil sx={{ fontSize: "80px", color: "#000", opacity: 0.7 }} />

      <ExpenseFormProvider>
        <ExpenseForm />
      </ExpenseFormProvider>
    </Stack>
  );
}
