import { Stack } from "@mui/material";
import Pencil from "@mui/icons-material/DriveFileRenameOutlineRounded";
import TransactionForm from "../_component/TransactionForm";
import TransactionFormProvider from "../_component/TransactionFormProvider";

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

      <TransactionFormProvider>
        <TransactionForm />
      </TransactionFormProvider>
    </Stack>
  );
}
