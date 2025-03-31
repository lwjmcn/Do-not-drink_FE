import { Stack, Typography } from "@mui/material";
import NotListedLocationRoundedIcon from "@mui/icons-material/NotListedLocationRounded";
import ButtonLink from "@component/ButtonLink";

export default function EmptyBudget() {
  return (
    <Stack
      direction={"column"}
      spacing={1}
      marginY={"auto"}
      alignItems={"center"}
    >
      <NotListedLocationRoundedIcon
        style={{ fontSize: 80, color: "#717171", margin: 16 }}
      />
      <Typography variant="h6" color="#717171">
        예산이 아직 설정되지 않았어요
      </Typography>
      <Typography variant="caption" color="#717171">
        이미 설정하셨다면 화면을 새로고침 해주세요
      </Typography>
      <ButtonLink title={"설정하러 가기"} href={"/set-budget"} />
    </Stack>
  );
}
