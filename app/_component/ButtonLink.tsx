import { Box, Typography } from "@mui/material";
import Link, { LinkProps } from "next/link";

interface ButtonLinkProps extends LinkProps {
  title: string;
}
export default function ButtonLink(props: ButtonLinkProps) {
  return (
    <Link {...props}>
      <Box
        sx={{
          bgcolor: "#FFECC0",
          borderRadius: 1,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          paddingX: 2,
        }}
      >
        <Typography variant="button">{props.title}</Typography>
      </Box>
    </Link>
  );
}
