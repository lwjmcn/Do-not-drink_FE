import { TextField, TextFieldProps } from "@mui/material";
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
  control?: Control<T>;
};

const Input = <T extends FieldValues>(props: TControl<T>) => {
  const { name, rules, control } = props;
  const {
    field: { value, onChange, onBlur },
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
      onBlur={onBlur}
      FormHelperTextProps={{
        sx: { marginLeft: 0 },
        ...props.FormHelperTextProps,
      }}
      {...props}
    />
  );
};
export default Input;
