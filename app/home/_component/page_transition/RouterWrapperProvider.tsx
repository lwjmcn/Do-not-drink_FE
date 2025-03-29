"use client";

import { useState } from "react";
import RouterWrapperContext from "./RouterWrapperContext";

export function RouterWrapper({ children }: { children: React.ReactNode }) {
  const [isBack, setIsBack] = useState<boolean>(false);
  const [transitionDisable, setTransitionDisable] = useState<boolean>(false);
  const [previousPage, setPreviousPage] = useState<React.ReactNode>(null);

  return (
    <RouterWrapperContext.Provider
      value={{
        isBack,
        setIsBack,
        transitionDisable,
        setTransitionDisable,
        previousPage,
        setPreviousPage,
      }}
    >
      {children}
    </RouterWrapperContext.Provider>
  );
}
