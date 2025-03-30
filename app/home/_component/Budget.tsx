"use client";

import { useState } from "react";
import { Stack } from "@mui/material";
import SlotMachineCounter from "./SlotMachineCounter";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Link from "next/link";

export default function Budget() {
  const [value, setValue] = useState(593900);

  // 버튼 클릭 시 값 감소
  const decreaseValue = () => {
    setValue((prevValue) => prevValue - 3010);
  };

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <SlotMachineCounter targetValue={value} />
      <Link href={"/set-budget"}>
        <KeyboardArrowRightRoundedIcon style={{ color: "#717171" }} />
      </Link>
    </Stack>
  );
}
