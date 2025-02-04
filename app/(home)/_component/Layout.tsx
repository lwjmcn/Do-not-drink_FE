import { Box, Button, Stack, Typography } from "@mui/material";
import DownArrow from "./DownArrow";
import Category from "./Category";
import AddFriend from "./AddFriend";
import Cube from "./Cube";

interface ILayoutProps {
  type: "me" | "friend" | "add";
}
const Layout = (props: ILayoutProps) => {
  const money = 500000;
  const name = "이예진";
  const likes = 100;
  const dislikes = 4;

  const layoutConfig = {
    me: { title: money.toLocaleString(), showCube: true },
    friend: { title: name + " 님", showCube: true },
    add: { title: "", showCube: false },
  };
  const { title, showCube } = layoutConfig[props.type];

  return (
    <Box width={"100vw"}>
      <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
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
          {title && <Typography variant="h2">{title}</Typography>}
          {showCube ? <Cube filename="milkbox_origin.glb" /> : <AddFriend />}
          {props.type !== "add" && (
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Stack direction="row" alignItems={"center"}>
                <Typography variant="h2">👍</Typography>
                <Typography variant="h5" width={"36px"} overflow={"hidden"}>
                  {likes > 99 ? "99+" : likes}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                onClick={() => alert("한 입 먹기")}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  fontSize: 16,
                  visibility: props.type === "me" ? "visible" : "hidden",
                }}
              >
                <Typography variant="h5">한 입</Typography>
              </Button>
              <Stack direction="row" alignItems={"center"}>
                <Typography variant="h2">👎</Typography>
                <Typography variant="h5" width={"36px"} overflow={"hidden"}>
                  {dislikes > 99 ? "99+" : dislikes}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Box>

        <Box sx={{ visibility: props.type === "me" ? "visible" : "hidden" }}>
          <DownArrow />
        </Box>
      </Box>
      {props.type === "me" && <Category />}
    </Box>
  );
};
export default Layout;
