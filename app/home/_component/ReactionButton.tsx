import { Stack, Typography } from "@mui/material";
import { sendReaction } from "app/_api/budget";
import { ReactToRequestDto } from "app/_api/request/budget.request.dto";
import { ReactToResponseDto } from "app/_api/response/budget.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import { ReactionType } from "public/type/reaction";
import ResponseCode from "public/type/response_code";

interface IReactionButtonProps {
  isLike: boolean;
  count: number;
  enabled?: boolean;
  friendId?: number;
}
const ReactionButton = (props: IReactionButtonProps) => {
  const sendReactionApi = async (data: ReactToRequestDto) => {
    await sendReaction(props.friendId!, data).then(sendReactionApiResponse);
  };

  const sendReactionApiResponse = (
    responseBody: ResponseBody<ReactToResponseDto>
  ) => {
    if (!responseBody) return;
    const { code, message } = responseBody;
    if (code == ResponseCode.SUCCESS) {
      console.log("sendReaction success");
    } else {
      console.log("sendReaction: ", message);
    }
  };

  const onClickLike = () => {
    const data: ReactToRequestDto = {
      reactionType: ReactionType.LIKE,
      count: 1,
    };
    sendReactionApi(data);
    console.log("send like");
  };

  const onClickDislike = () => {
    const data: ReactToRequestDto = {
      reactionType: ReactionType.DISLIKE,
      count: 1,
    };
    sendReactionApi(data);
    console.log("send dislike");
  };

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
          userSelect: "none",
        }}
        onClick={() => {
          if (!props.enabled) return;
          else if (props.isLike) onClickLike();
          else onClickDislike();
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
