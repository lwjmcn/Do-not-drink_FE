import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{ color: "text.secondary", padding: 2 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/lwjmcn">
        Do Not Drink
      </Link>
      {" 2025."}
    </Typography>
  );
}
