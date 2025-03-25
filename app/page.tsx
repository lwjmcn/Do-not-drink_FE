import BabylonView from "@component/fluid/BabylonView";
import { Stack } from "@mui/material";

const InitialPage = () => {
  return (
    <Stack direction="column" spacing={2}>
      <h1>Welcome </h1>
      <BabylonView />
      <a href="/auth/signin">로그인</a>
    </Stack>
  );
};

export default InitialPage;
