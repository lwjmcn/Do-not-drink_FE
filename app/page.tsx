import AutoCarousel from "@component/AutoCarousel";
import ButtonLink from "@component/ButtonLink";
import { Stack, Typography } from "@mui/material";

const InitialPage = () => {
  const images = [
    { src: "/image/orange_juice.png", alt: "orange" },
    { src: "/image/lemon_juice.png", alt: "lemon" },
  ];

  return (
    <Stack direction="column" spacing={6} marginY={"auto"}>
      <Typography variant="h1" alignSelf={"center"} color={"#FFBA18"}>
        Do Not Drink
      </Typography>
      <AutoCarousel images={images} width={240} />
      <ButtonLink title="로그인" href={"/auth/signin"} />
    </Stack>
  );
};

export default InitialPage;
