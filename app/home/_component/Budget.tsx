"use client";

import { useLayoutEffect, useState } from "react";
import { Stack } from "@mui/material";
import SlotMachineCounter from "./SlotMachineCounter";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Link from "next/link";

interface BudgetProps {
  remains: number;
}
export default function Budget({ remains }: BudgetProps) {
  const [value, setValue] = useState<number>(0);

  useLayoutEffect(() => {
    setValue(remains);
  }, [remains]);

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <SlotMachineCounter targetValue={value} />
      <Link href={"/set-budget/fail"}>
        <KeyboardArrowRightRoundedIcon style={{ color: "#717171" }} />
      </Link>
    </Stack>
  );
}
