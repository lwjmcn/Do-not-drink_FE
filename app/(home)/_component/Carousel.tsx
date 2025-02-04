"use client";
import { Box, Button } from "@mui/material";
import { JSX, memo, useEffect, useState } from "react";
import ArrowLeft from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowRight from "@mui/icons-material/ArrowForwardIosRounded";
import Cube from "./Cube";
import AddFriend from "./AddFriend";

interface IListData {
  id: number;
  name: string;
  el: JSX.Element;
}
const list: IListData[] = [
  {
    id: 0,
    name: "로라",
    el: <Cube />,
  },
  {
    id: 1,
    name: "예진",
    el: <AddFriend />,
  },
  {
    id: 2,
    name: "희주",
    el: <Box width={"200px"} height={"200px"} bgcolor={"blue"} />,
  },
  {
    id: 3,
    name: "지원",
    el: <Box width={"200px"} height={"200px"} bgcolor={"green"} />,
  },
];
const extendedList = [list[list.length - 1], ...list, list[0]];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const toPrev = () => {
    setTransition(true);
    setCurrentIndex((prev) => (prev - 1) % extendedList.length);
  };
  const toNext = () => {
    setTransition(true);
    setCurrentIndex((prev) => (prev + 1) % extendedList.length);
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentIndex === 0) {
      timeoutId = setTimeout(() => {
        setTransition(false);
        setCurrentIndex(extendedList.length - 2);
      }, 500);
    } else if (currentIndex === extendedList.length - 1) {
      timeoutId = setTimeout(() => {
        setTransition(false);
        setCurrentIndex(1);
      }, 500);
    }
    console.log("currentIndex", currentIndex);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex]);

  return (
    <Box sx={{ width: "100vw", position: "relative", overflow: "hidden" }}>
      {/* carousel */}
      <Box
        sx={{
          display: "flex",
          transition: transition ? "transform 0.5s ease-in-out" : "none",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {Array(extendedList.length)
          .fill(0)
          .map((_, id) => (
            <CarouselItem key={id} id={id} />
          ))}
      </Box>

      {/* left/right */}
      <Button
        onClick={toPrev}
        disableRipple
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          ":hover": {
            backgroundColor: "transparent",
            border: "none",
          },
        }}
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={toNext}
        disableRipple
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          ":hover": {
            backgroundColor: "transparent",
            border: "none",
          },
        }}
      >
        <ArrowRight />
      </Button>
    </Box>
  );
};

const CarouselItem = memo(({ id }: { id: number }) => {
  return (
    <Box
      key={id}
      sx={{
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: "background.default",
        maxHeight: "300px",
        overflow: "hidden",
      }}
    >
      {extendedList[id].el}
    </Box>
  );
});
CarouselItem.displayName = "CarouselItem";

export default Carousel;
