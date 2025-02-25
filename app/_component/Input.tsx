import {
  Button,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { error } from "console";
import { register } from "module";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

export type TControl<T extends FieldValues> = Omit<
  TextFieldProps,
  "name" | "onChange" | "value" | "error" | "helperText"
> & {
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  control: Control<T>;
};

const Input = <T extends FieldValues>(props: TControl<T>) => {
  const { name, rules, control } = props;
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <TextField
      variant="standard"
      label={props.name}
      value={value}
      onChange={onChange}
      required={true}
      error={!!error}
      helperText={error?.message}
      FormHelperTextProps={{
        sx: { marginLeft: 0 },
        ...props.FormHelperTextProps,
      }}
      {...props}
    />
  );
};
export default Input;
