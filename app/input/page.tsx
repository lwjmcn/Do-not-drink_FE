import { Stack } from "@mui/material";
import Camera from "@mui/icons-material/CameraAltRounded";
import Pencil from "@mui/icons-material/DriveFileRenameOutlineRounded";
import IconBox from "./_component/IconBox";

const Input = () => {
  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <IconBox
        icon={<Camera />}
        text={"사진으로 입력하기"}
        href={"/input/cam"}
      />
      <IconBox icon={<Pencil />} text={"직접 입력하기"} href={"/input/write"} />
    </Stack>
  );
};

export default Input;
