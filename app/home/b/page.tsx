import { Stack } from "@mui/material";
import UserMeLayoutTest from "./_component/UserMeLayoutTest";

const Home = () => {
  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <UserMeLayoutTest />
    </Stack>
  );
};

export default Home;
