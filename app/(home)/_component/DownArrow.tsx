"use client";
import { Stack, Typography, ButtonBase } from "@mui/material";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

const DownArrow = () => {
  const slowScroll = () => {
    const startY = window.scrollY;
    const endY = window.innerHeight;
    const duration = 500;
    const startTime = performance.now();

    const scrollStep = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startY + (endY - startY) * easeInOutQuad);

      if (progress < 1) requestAnimationFrame(scrollStep);
    };
    requestAnimationFrame(scrollStep);
  };

  return (
    <Stack direction="column" alignItems={"center"} marginY={3}>
      <Typography variant="caption">카테고리별로 확인하기</Typography>
      <ButtonBase onClick={slowScroll}>
        <KeyboardDoubleArrowDownRoundedIcon
          sx={{
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(5px)" },
            },
            animation: "bounce 1s infinite ease-in-out",
            // opacity: 0.5,
            color: "text.secondary",
          }}
        />
      </ButtonBase>
    </Stack>
  );
};

export default DownArrow;
