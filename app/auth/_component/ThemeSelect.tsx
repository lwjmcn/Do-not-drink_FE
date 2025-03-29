"use client";

import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import ThemeCard from "./ThemeCard";

export interface ITheme {
  id: number;
  name: string;
  color: string;
  fileUrl: string;
}
const data: ITheme[] = [
  {
    id: 1,
    name: "오렌지주스",
    color: "#FFD67D",
    fileUrl: "/image/orange_juice.png",
  },
  {
    id: 2,
    name: "포도주스",
    color: "#F1CAEC",
    fileUrl: "/image/grape_juice.png",
  },
  {
    id: 3,
    name: "레몬주스",
    color: "#FFFEA2",
    fileUrl: "/image/lemon_juice.png",
  },
  {
    id: 4,
    name: "테마4",
    color: "#FFC5C2",
    fileUrl: "/image/google.svg",
  },
]; // TODO: 서버에서 받아오기

const ThemeSelect = () => {
  return (
    <Stack direction="column" spacing={2} flex={1}>
      {/* <Input name="themeId" label="테마" /> */}
      <Grid
        container
        rowSpacing={2}
        columnSpacing={1}
        flex={1}
        maxWidth={400}
        width={"100%"}
        direction={"row"}
        alignSelf={"center"}
        alignItems={"stretch"}
      >
        {data.map((theme) => (
          <Grid key={theme.id} size={6}>
            <ThemeCard {...theme} />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="text" sx={{ bgcolor: "#fff" }}>
        <Typography variant="button" color="#000">
          가입 완료하기
        </Typography>
      </Button>
    </Stack>
  );
};

export default ThemeSelect;
