import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface IReactionButtonProps {
  isLike: boolean;
  count: number;
  enabled?: boolean;
}
const ReactionButton = (props: IReactionButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Stack direction="row" alignItems={"center"}>
      <Typography
        variant="h2"
        sx={{
          "@keyframes up": {
            "0%": { transform: "none", opacity: 1 },
            "30%": { transform: "translateY(-20px)", opacity: 0 },
            "100%": { transform: "none", opacity: 1 },
          },
          "@keyframes down": {
            "0%": { transform: "none", opacity: 1 },
            "30%": { transform: "translateY(20px)", opacity: 0 },
            "100%": { transform: "none", opacity: 1 },
          },
          ":active": {
            animation: !props.enabled
              ? "none"
              : props.isLike
              ? "up 0.5s forwards"
              : "down 0.5s forwards",
          },
          cursor: props.enabled ? "pointer" : "default",
        }}
        onClick={() => {
          if (!props.enabled) return;
          else if (props.isLike) alert("좋아요");
          else alert("싫어요");
        }}
      >
        {props.isLike ? "👍" : "👎"}
      </Typography>
      <Typography variant="h5" width={"36px"} overflow={"hidden"}>
        {props.count > 99 ? "99+" : props.count}
      </Typography>
    </Stack>
  );
};

export default ReactionButton;
