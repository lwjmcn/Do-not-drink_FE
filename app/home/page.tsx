import { Stack } from "@mui/material";
import UserMeLayout from "./_component/UserMeLayout";

const Home = () => {
  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <UserMeLayout />
    </Stack>
  );
};

export default Home;
