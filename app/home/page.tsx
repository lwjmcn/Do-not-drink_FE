import { Box, Button } from "@mui/material";
import Carousel from "./_component/Carousel";
import { signOut } from "auth";

const Home = () => {
  return (
    <Box>
      <Button
        variant="text"
        size="small"
        sx={{
          textDecoration: "underline",
          textUnderlineOffset: 4,
          position: "absolute",
        }}
        onClick={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        Logout
      </Button>
      <Carousel />
    </Box>
  );
};

export default Home;
