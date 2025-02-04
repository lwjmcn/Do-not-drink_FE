import { Box, Button } from "@mui/material";
import Carousel from "./_component/Carousel";

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
      >
        Logout
      </Button>
      <Carousel />
    </Box>
  );
};

export default Home;
