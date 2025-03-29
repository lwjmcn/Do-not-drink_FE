"use client";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        border: "none",
        background: "none",
        position: "absolute",
        top: 20,
        left: 20,
        color: "#FE9600",
      }}
    >
      <KeyboardBackspaceRoundedIcon />
    </button>
  );
}
