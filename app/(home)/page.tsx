import { Box, Button, Stack, Typography } from "@mui/material";
import Cube from "./_component/Cube";
import DownArrow from "./_component/DownArrow";
import Category from "./_component/Category";

const Home = () => {
  const money = 500000;
  const likes = 100;
  const dislikes = 4;

  return (
    <Box>
      <Typography variant="button" textTransform={"none"}>
        Logout
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          gap: 4,
        }}
      >
        <Typography variant="h2">{money.toLocaleString()}</Typography>
        <Cube />
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Stack direction="row" alignItems={"center"}>
            <Typography variant="h2">👍</Typography>
            <Typography variant="h5" width={"36px"} overflow={"hidden"}>
              {likes > 99 ? "99+" : likes}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{ width: 120, height: 60, fontSize: 16 }}
          >
            한 입 먹기
          </Button>
          <Stack direction="row" alignItems={"center"}>
            <Typography variant="h2">👎</Typography>
            <Typography variant="h5" width={"36px"} overflow={"hidden"}>
              {dislikes > 99 ? "99+" : dislikes}
            </Typography>
          </Stack>
        </Stack>
        <DownArrow />
        <Category />
      </Box>
    </Box>
  );
};

export default Home;
