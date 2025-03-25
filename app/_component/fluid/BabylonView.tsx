"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FluidRenderer = dynamic(() => import("./FluidRenderer"), { ssr: false });

const BabylonView = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true));

  return <>{loaded ? <FluidRenderer /> : <div>Loading...</div>}</>;
};
export default BabylonView;
