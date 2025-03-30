import { Stack } from "@mui/material";
import Layout from "./_component/Layout";

const Home = () => {
  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <Layout type={"me"} />
    </Stack>
  );
};

export default Home;
