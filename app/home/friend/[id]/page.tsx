import { Stack } from "@mui/material";
import FriendLayout from "app/home/_component/FriendLayout";
import { useParams } from "next/navigation";

const FriendHome = () => {
  const params = useParams();

  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <FriendLayout friendId={Number(params.id)} />
    </Stack>
  );
};
export default FriendHome;
