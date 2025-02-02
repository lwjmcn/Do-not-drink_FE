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
      <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
        <Button
          variant="text"
          size="small"
          sx={{
            textDecoration: "underline",
            textUnderlineOffset: 4,
            alignSelf: "flex-start",
          }}
        >
          Logout
        </Button>
        <Box
          sx={{
            flex: 1,
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 8,
            gap: 4,
          }}
        >
          <Typography variant="h1">{money.toLocaleString()}</Typography>
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
        </Box>
        <DownArrow />
      </Box>
      <Category />
    </Box>
  );
};

export default Home;
