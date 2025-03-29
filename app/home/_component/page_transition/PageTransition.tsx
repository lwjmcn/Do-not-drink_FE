"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRouterWrapper } from "./RouterWrapperContext";
import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

interface PageTransitionProps {
  children: React.ReactNode;
}
const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const { previousPage, isBack, transitionDisable, setPreviousPage } =
    useRouterWrapper();

  const lastChildrenRef = useRef<React.ReactNode>(children); // 이전 children 저장용 ref

  useEffect(() => {
    lastChildrenRef.current = children; // 새로운 children이 렌더링될 때마다 ref에 저장
  }, [children]);
  if (transitionDisable) return children;
  return (
    <div style={{ display: "flex", position: "relative", flex: 1 }}>
      {/* 현재 페이지 */}
      <motion.div
        key={pathname}
        custom={isBack}
        initial={{ x: isBack ? "-100vw" : "100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onAnimationComplete={() => {
          setTimeout(() => {
            setPreviousPage(lastChildrenRef.current); // 애니메이션이 완료된 후에 이전 페이지를 업데이트
          }, 1000);
        }}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {children}
      </motion.div>

      {/* 캐시된 페이지 */}
      {/* <motion.div
        key={"cached" + pathname}
        custom={isBack}
        initial={{ x: 0 }}
        animate={{ x: isBack ? "100vw" : "-100vw" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "100vw",
        }}
      >
        {previousPage}
      </motion.div> */}
    </div>
  );
};
export default PageTransition;
