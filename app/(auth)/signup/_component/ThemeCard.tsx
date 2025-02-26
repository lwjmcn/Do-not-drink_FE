import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { ISignUpForm } from "./SignUpFormProvider";
import { ITheme } from "./ThemeSelect";

const ThemeCard = (props: ITheme) => {
  const { setValue, watch } = useFormContext<ISignUpForm>();

  return (
    <Card
      onClick={() => setValue("themeId", props.id)}
      sx={{
        backgroundColor: "background.default",
        padding: 0.5,
        minHeight: "100%",
        display: "flex",
        border:
          watch("themeId") === props.id
            ? "1px solid blue"
            : "1px solid transparent",
      }}
    >
      <CardContent sx={{ position: "relative", minWidth: "100%" }}>
        <Image
          src={props.fileUrl}
          alt={props.name}
          fill
          style={{ borderRadius: 5, backgroundColor: props.color, padding: 20 }}
        />
      </CardContent>
    </Card>
  );
};
export default ThemeCard;
