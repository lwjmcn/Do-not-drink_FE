"use client";

import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FluidRenderer = dynamic(() => import("./FluidRenderer"), { ssr: false });

const BabylonView = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true));

  return (
    <>
      {loaded ? (
        <FluidRenderer />
      ) : (
        <Skeleton variant="rounded" width={300} height={300} />
      )}
    </>
  );
};
export default BabylonView;
