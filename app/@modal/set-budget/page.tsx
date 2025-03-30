"use client";
import ModalContainer from "@component/ModalContainer";
import { Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";

export default function SetBudgetModal() {
  const [budget, setBudget] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <ModalContainer>
      <Stack
        direction="column"
        spacing={2}
        marginBottom={2}
        marginX={1}
        alignItems={"center"}
      >
        <Typography variant="h6" color="#717171">
          이번 달 <span style={{ color: "#FE9600" }}>예산</span>은 얼마인가요?
        </Typography>
        <TextField
          variant="standard"
          size="medium"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          required={true}
          error={error}
          helperText={error ? errorMessage : ""}
          FormHelperTextProps={{
            sx: { marginLeft: 0 },
          }}
          InputProps={{
            endAdornment: <Typography>원</Typography>,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          sx={{
            width: "120px",
          }}
        />
      </Stack>
    </ModalContainer>
  );
}
