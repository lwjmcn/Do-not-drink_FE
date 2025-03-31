import React, { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, Stack } from "@mui/material";

interface SlotMachineCounterProps {
  targetValue: number;
  duration?: number;
  initialValue?: number;
}

export default function SlotMachineCounter({
  targetValue,
  duration = 1500,
  initialValue = targetValue,
}: SlotMachineCounterProps) {
  const [displayValue, setDisplayValue] = useState(initialValue);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // 새로운 목표값이 설정되면 애니메이션 재시작
    setKey((prevKey) => prevKey + 1);

    // 초기 값부터 목표값까지 단계적으로 감소시킴
    const startValue = Math.max(targetValue, displayValue);
    const steps = 11;
    const decrement = Math.abs(Math.floor((startValue - targetValue) / steps));
    const stepDuration = duration / steps;

    let currentValue = startValue;
    let step = 0;

    const timer = setInterval(() => {
      step++;

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(targetValue);
        return;
      }
      currentValue = Math.max(targetValue, currentValue - decrement);
      setDisplayValue(currentValue);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      {displayValue
        .toLocaleString()
        .split("") // 자릿수별로 분할
        .map((digit, index) => (
          <Digit
            key={`${key}-${index}`}
            animationKey={key}
            digit={digit}
            index={index}
          />
        ))}
    </Stack>
  );
}

const Digit = memo(
  ({
    digit,
    animationKey,
    index,
  }: {
    digit: string;
    animationKey: number;
    index: number;
  }) => {
    return (
      <Box
        sx={{
          overflow: "hidden",
          height: 36,
          width: digit === "," ? 8 : 24,
          position: "relative",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${animationKey}-${digit}-${index}`}
            initial={{ y: -100, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              mass: 0.5,
              bounce: 0.2,
              duration: 0.05,
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "GMarketSans",
                fontSize: 36,
                userSelect: "none",
                width: "100%",
                textAlign: "center",
              }}
            >
              {digit}
            </p>
          </motion.div>
        </AnimatePresence>
      </Box>
    );
  }
);
Digit.displayName = "Digit";
