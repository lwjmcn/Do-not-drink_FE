"use client";

import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ISignUpForm } from "./SignUpFormProvider";
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
    name: "테마1",
    color: "#abcdef",
    fileUrl: "/image/google.svg",
  },
  {
    id: 2,
    name: "테마2",
    color: "#234897",
    fileUrl: "/image/kakao.svg",
  },
  {
    id: 3,
    name: "테마3",
    color: "#dff90e",
    fileUrl:
      "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "테마4",
    color: "#fa1334",
    fileUrl:
      "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ThemeSelect = () => {
  const router = useRouter();
  const { trigger } = useFormContext<ISignUpForm>();

  return (
    <Stack direction="column" spacing={2} flex={1}>
      {/* <Input name="themeId" label="테마" /> */}
      <Grid
        container
        spacing={1}
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
      <Button type="submit" variant="contained">
        <Typography>가입 완료하기</Typography>
      </Button>
    </Stack>
  );
};

export default ThemeSelect;
