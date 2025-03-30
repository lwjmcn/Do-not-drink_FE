"use client";

import { Button, Stack, Typography } from "@mui/material";
import ReactionButton from "./ReactionButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Budget from "./Budget";
import { useRouterWrapper } from "./page_transition/RouterWrapperContext";
import GLTFViewer from "./GLTFViewer";

interface ILayoutProps {
  type: "me" | "friend";
}
const Layout = (props: ILayoutProps) => {
  const money = 500000;
  const name = "이예진";
  const likes = 100;
  const dislikes = 4;

  const router = useRouter();
  const { setTransitionDisable } = useRouterWrapper();

  return (
    <Stack
      direction={"column"}
      spacing={2}
      marginY={"auto"}
      alignItems={"center"}
    >
      {props.type === "me" && <Budget />}
      {props.type === "friend" && (
        <Typography variant="h2">{name + " 님"}</Typography>
      )}
      <Suspense>
        <Link href={"/category"} onClick={() => setTransitionDisable(true)}>
          <GLTFViewer filename="orange_juice.glb" />
        </Link>
      </Suspense>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <ReactionButton
          isLike={true}
          count={likes}
          enabled={props.type === "friend"}
        />

        <Button
          variant="text"
          onClick={() => router.push("/input")}
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "#FFD67D",
            fontSize: 16,
            visibility: props.type === "me" ? "visible" : "hidden",
          }}
        >
          <Typography variant="button" color="#fff">
            한 입
          </Typography>
        </Button>
        <ReactionButton
          isLike={false}
          count={dislikes}
          enabled={props.type === "friend"}
        />
      </Stack>
    </Stack>
  );
};
export default Layout;
