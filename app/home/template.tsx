"use client";

import { useEffect } from "react";
import PageTransition from "./_component/page_transition/PageTransition";
import { useRouterWrapper } from "./_component/page_transition/RouterWrapperContext";

export default function HomeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTransitionDisable } = useRouterWrapper();

  useEffect(() => {
    setTimeout(() => {
      setTransitionDisable(false);
    }, 500);
  }, []);

  return <PageTransition>{children}</PageTransition>;
}
