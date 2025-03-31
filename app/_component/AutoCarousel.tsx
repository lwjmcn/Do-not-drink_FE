"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";

interface AutoCarouselProps {
  images: { src: string; alt?: string }[];
  width?: number;
  height?: number;
  speed?: number;
}
const AutoCarousel = ({
  images,
  width = 300,
  height = 300,
  speed = 80,
}: AutoCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(width / 2);

  // 이미지를 세 번 복제하여 연속적인 스크롤 효과 생성
  const duplicatedImages = [...images, ...images, ...images];

  // 무한 스크롤
  useEffect(() => {
    let animationId: number;
    let lastTimestamp = 0;

    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      const delta = (speed * elapsed) / 1000; // 속도 계산 (픽셀/초)

      setScrollPosition((prev) => {
        const newPosition = prev + delta;
        // 이미지 세트 하나의 너비를 넘어가면 리셋 (3개의 이미지 세트 중 첫 번째가 완전히 지나가면)
        const imageSetWidth = (width + 10) * images.length;

        if (newPosition >= imageSetWidth) {
          return newPosition - imageSetWidth;
        }
        return newPosition;
      });

      lastTimestamp = timestamp;
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed]);

  return (
    <Box overflow={"hidden"}>
      <Box
        sx={{
          transform: `translateX(-${scrollPosition}px)`,
          transition: "none",
          display: "flex",
          height: "100%",
        }}
      >
        {duplicatedImages.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt || `슬라이드 ${index}`}
            width={width}
            height={height}
            style={{
              objectFit: "contain",
              borderRadius: 2,
              marginRight: 10,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AutoCarousel;
