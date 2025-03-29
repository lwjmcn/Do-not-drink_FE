import { Stack } from "@mui/material";
import Layout from "app/home/_component/Layout";

const FriendHome = () => {
  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <Layout type={"friend"} />
    </Stack>
  );
};
export default FriendHome;
