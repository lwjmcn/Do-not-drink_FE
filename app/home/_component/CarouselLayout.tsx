"use client";

import { useParams, usePathname } from "next/navigation";
import ExtendedLink from "./page_transition/ExtendedLink";
import ArrowLeft from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowRight from "@mui/icons-material/ArrowForwardIosRounded";

export default function CarouselLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const pathname = usePathname();
  const friend_count: number = 3;

  const nextHref = pathname.endsWith("/add")
    ? "/home"
    : pathname.endsWith("/home")
    ? `/home/friend/1`
    : pathname.endsWith(`/friend/${friend_count}`)
    ? `/home/friend/add`
    : `/home/friend/${parseInt(id as string) + 1}`;
  const prevHref = pathname.endsWith("/add")
    ? `/home/friend/${friend_count}`
    : pathname.endsWith("/home")
    ? `/home/friend/add`
    : pathname.endsWith(`/friend/1`)
    ? `/home`
    : `/home/friend/${parseInt(id as string) - 1}`;
  return (
    <>
      {children}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: "50vh",
          transform: "translateY(-50%)",
        }}
      >
        <ExtendedLink href={prevHref} isBack={true}>
          <ArrowLeft style={{ color: "#FFD676" }} />
        </ExtendedLink>
      </div>
      <div
        style={{
          position: "absolute",
          right: 10,
          top: "50vh",
          transform: "translateY(-50%)",
        }}
      >
        <ExtendedLink href={nextHref} isBack={false}>
          <ArrowRight style={{ color: "#FFD676" }} />
        </ExtendedLink>
      </div>
    </>
  );
}
