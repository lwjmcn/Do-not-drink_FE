"use client";

import { Stack } from "@mui/material";
import Layout from "./_component/Layout";
import { useEffect } from "react";
import { useRouterWrapper } from "./_component/page_transition/RouterWrapperContext";

const Home = () => {
  const { setTransitionDisable } = useRouterWrapper();

  useEffect(() => {
    setTimeout(() => {
      setTransitionDisable(false);
    }, 500);
  }, []);

  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <Layout type={"me"} />
    </Stack>
  );
};

export default Home;
