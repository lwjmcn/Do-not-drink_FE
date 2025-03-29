"use client";
import React from "react";
import useMediaQuery from "./useMediaQuery";

const MediaSizeDisplay: React.FC = () => {
  const size = useMediaQuery();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        textAlign: "center",
        padding: "10px",
        zIndex: 9999,
      }}
    >
      <p
        style={{
          margin: 0,
        }}
      >
        Current Media Size: {size}
      </p>
    </div>
  );
};
export default MediaSizeDisplay;
