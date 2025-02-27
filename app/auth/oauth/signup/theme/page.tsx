import { Stack, Typography } from "@mui/material";
import ThemeSelect from "../../../_component/ThemeSelect";

const ChooseTheme = () => {
  return (
    <Stack direction={"column"} spacing={2} flex={1}>
      <Typography variant="h2">Select Your Theme</Typography>

      {/* Theme Select */}
      <ThemeSelect />
    </Stack>
  );
};
export default ChooseTheme;
