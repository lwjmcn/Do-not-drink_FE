"use client";
import { Box, Button } from "@mui/material";
import { memo, useEffect, useState } from "react";
import ArrowLeft from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowRight from "@mui/icons-material/ArrowForwardIosRounded";
import Layout from "./Layout";

interface IListData {
  index: number;
  name: string;
  gltf: string;
  percentage?: number;
}

const friends: IListData[] = [
  {
    index: 2,
    name: "희주",
    gltf: "/milkbox.glb",
    percentage: 50,
  },
  {
    index: 3,
    name: "지원",
    gltf: "/milkbox.glb",
    percentage: 30,
  },
];
// for infinite carousel
// const extendedList = [friends[friends.length - 1], ...friends, friends[0]];
// const extendedList = [<AddFriend/>, <Cube/>, ...friends, <AddFriend/>, <Cube/>];
// const extendedList = [
//   { id: 0, el: <Layout type="add" /> },
//   { id: 1, el: <Layout type="me" /> },
//   ...friends.map((friend, i) => {
//     return { id: 2 + i, el: <Layout type="friend" /> };
//   }),
//   { id: friends.length + 2, el: <Layout type="add" /> },
//   { id: friends.length + 3, el: <Layout type="me" /> },
// ];
interface IExtendedList {
  id: number;
  type: "add" | "me" | "friend";
}
const extendedList: IExtendedList[] = [
  { id: 0, type: "add" },
  { id: 1, type: "me" },
  ...friends.map((friend, i) => {
    return { id: 2 + i, type: "friend" as const };
  }),
  { id: friends.length + 2, type: "add" },
  { id: friends.length + 3, type: "me" },
];

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

  // const visiblePages = useMemo(() => {
  //   return extendedList.filter(
  //     (_, index) =>
  //       Math.abs(index - currentIndex) <= 1 ||
  //       (index === 0 && currentIndex === extendedList.length - 1) ||
  //       (index === extendedList.length - 1 && currentIndex === 0)
  //   );
  // }, [currentIndex]);

  return (
    <Box sx={{ width: "100vw", position: "relative", overflow: "hidden" }}>
      {/* carousel */}
      <Box
        sx={{
          display: "-webkit-box",
          transition: transition ? "transform 0.5s ease-in-out" : "none",
          transform: `translateX(-${currentIndex * 100}vw)`,
        }}
      >
        {extendedList.map((page) => {
          console.log(page.id);
          return <CarouselItem key={page.id} index={page.id} />;
        })}
      </Box>

      {/* left/right */}
      <Button
        onClick={toPrev}
        disableRipple
        sx={{
          position: "absolute",
          left: 0,
          top: "50vh",
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
          top: "50vh",
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

const CarouselItem = memo(({ index }: { index: number }) => {
  return (
    <Layout key={extendedList[index].id} type={extendedList[index].type} />
  );
});
CarouselItem.displayName = "CarouselItem";

export default Carousel;
