import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { ITheme } from "./ThemeSelect";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const ThemeCard = (props: ITheme) => {
  const { setValue, watch } = useFormContext();

  return (
    <Card
      onClick={() => setValue("themeId", props.id)}
      sx={{
        position: "relative",
        minHeight: 160,
        display: "flex",
      }}
    >
      <CheckRoundedIcon
        sx={{
          position: "absolute",
          top: "calc(50% - 40px)",
          right: "calc(50% - 40px)",
          visibility: watch("themeId") === props.id ? "visible" : "hidden",
          fontSize: 80,
          color: "#fff",
          zIndex: 1,
        }}
      />
      <CardContent
        sx={{
          position: "relative",
          minWidth: "100%",
          borderRadius: 3,
          backgroundColor: props.color,
          filter: watch("themeId") === props.id ? "contrast(50%)" : "none",
        }}
      >
        <Image
          src={props.fileUrl}
          alt={props.name}
          fill
          sizes="100%"
          style={{ padding: 20, objectFit: "cover" }}
        />
      </CardContent>
    </Card>
  );
};
export default ThemeCard;
