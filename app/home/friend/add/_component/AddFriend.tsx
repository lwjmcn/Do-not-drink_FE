"use client";

import Add from "@mui/icons-material/AddRounded";
import { Box, Stack, Typography } from "@mui/material";

const AddFriend = () => {
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
          bgcolor: "info.contrastText",
          width: "200px",
          height: "150px",
          borderRadius: "20px",
          marginTop: "90px",
          marginBottom: "16px",
        }}
        onClick={() => alert("add friend")}
      >
        <Add
          sx={{
            width: "60px",
            fontSize: "60px",
            color: "text.secondary",
            opacity: 0.7,
          }}
        />
      </Box>
      <Typography variant="h6" sx={{ opacity: 0.5, fontWeight: 600 }}>
        친구 추가하기 (0/15)
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.5 }}>
        목표 금액까지 몇 퍼센트가 남았는지 공유할 수 있어요.
      </Typography>
    </Stack>
  );
};

export default AddFriend;
