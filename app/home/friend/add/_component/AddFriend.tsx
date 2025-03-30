"use client";

import Add from "@mui/icons-material/AddRounded";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const AddFriend = () => {
  const router = useRouter();

  return (
    <Stack
      direction="column"
      spacing={6}
      marginX={2}
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FFE6AC",
          width: "200px",
          height: "150px",
          borderRadius: "20px",
          marginTop: "90px",
          marginBottom: "16px",
          ":active": {
            bgcolor: "#FFD67D",
          },
        }}
        onClick={() => router.push("/add-friend")}
      >
        <Add
          sx={{
            width: "60px",
            fontSize: "60px",
            color: "#FE9600",
            opacity: 0.7,
          }}
        />
      </Box>
      <Stack direction={"column"} spacing={1} alignItems={"center"}>
        <Typography variant="h6" color="#717171">
          친구 추가하기 (0/15)
        </Typography>
        <Typography variant="caption" color="#717171">
          목표 금액까지 몇 퍼센트가 남았는지 공유할 수 있어요.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AddFriend;
