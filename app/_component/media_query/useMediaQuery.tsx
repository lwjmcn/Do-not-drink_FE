"use client";
import { useEffect, useState } from "react";

const useMediaQuery = () => {
  const [size, setSize] = useState("lg"); // 기본값을 'lg'로 설정

  const handleResize = () => {
    // xs: 0,
    //   sm: 600,
    //   md: 960,
    //   lg: 1280,
    //   xl: 1920,
    if (window.innerWidth < 600) {
      setSize("xs");
    } else if (window.innerWidth < 960) {
      setSize("sm");
    } else if (window.innerWidth < 1280) {
      setSize("md");
    } else if (window.innerWidth < 1920) {
      setSize("lg");
    } else {
      setSize("xl");
    }
  };

  useEffect(() => {
    handleResize(); // 초기 사이즈 설정
    window.addEventListener("resize", handleResize); // resize 이벤트 리스너 추가

    return () => {
      window.removeEventListener("resize", handleResize); // cleanup
    };
  }, []);

  return size;
};

export default useMediaQuery;
