"use client";
import ModalContainer from "@component/ModalContainer";
import { Stack, Typography, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SetBudgetModal() {
  const router = useRouter();

  const [id, setId] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <ModalContainer onClickPositive={() => router.replace("/add-friend/fail")}>
      <Stack
        direction="column"
        spacing={2}
        marginBottom={2}
        marginX={1}
        alignItems={"center"}
      >
        <Typography variant="h6" color="#717171">
          친구의 <span style={{ color: "#FE9600" }}>아이디</span>를 아시나요?
        </Typography>
        <TextField
          variant="standard"
          size="medium"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required={true}
          error={error}
          helperText={error ? errorMessage : ""}
          FormHelperTextProps={{
            sx: { marginLeft: 0 },
          }}
          sx={{
            width: "120px",
          }}
        />
      </Stack>
    </ModalContainer>
  );
}
