import { Stack, Typography } from "@mui/material";
import ThemeSelect from "../../_component/ThemeSelect";

const ChooseTheme = () => {
  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <Typography variant="h4" alignSelf={"center"} color="#717171">
        <span style={{ color: "#FE9600" }}>테마</span>를 선택해주세요
      </Typography>

      {/* Theme Select */}
      <ThemeSelect />
    </Stack>
  );
};
export default ChooseTheme;
