import { RouterWrapper } from "./_component/page_transition/RouterWrapperProvider";
import CarouselLayout from "./_component/CarouselLayout";
import BackButton from "@component/BackButton";
import MenuButton from "@component/MenuButton";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RouterWrapper>
      <MenuButton />
      <CarouselLayout>{children}</CarouselLayout>
    </RouterWrapper>
  );
}
