import { Typography, Box, Button, Divider, Stack } from "@mui/material";
import Link from "next/link";
// import SignUpForm from "../_component/SignUpForm";
import SignUpForm from "../_component/SignUpForm_hook";

const SignUp = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h2">Sign Up</Typography>

      {/* Email Sign Up */}
      <SignUpForm />

      {/* Sign in */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={"4px"}
      >
        <Typography>계정이 이미 있으신가요?</Typography>
        <Link
          href="/signup"
          style={{ alignSelf: "center", textDecorationLine: "underline" }}
        >
          <Typography variant="body2">로그인</Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default SignUp;
