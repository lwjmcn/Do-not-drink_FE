"use client";

import { Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface OrderIndicatorProps {
  navigationOrder: string[];
}
export default function OrderIndicator({
  navigationOrder,
}: OrderIndicatorProps) {
  const pathname = usePathname();

  return (
    <Stack
      direction="row"
      spacing={"8px"}
      sx={{
        position: "absolute",
        top: 80,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
      }}
    >
      {navigationOrder.map((_, index) => (
        <FiberManualRecordIcon
          key={index}
          sx={{
            fontSize: "7px",
            color: pathname === navigationOrder[index] ? "#FF8000" : "#FFD676",
          }}
        />
      ))}
    </Stack>
  );
}
