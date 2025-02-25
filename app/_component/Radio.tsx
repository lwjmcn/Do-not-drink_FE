import { ChangeEvent } from "react";
import {
  RadioGroupProps as MuiRadioGroupProps,
  FormControlLabelProps,
  FormControl,
  FormControlLabel,
  Radio as MuiRadio,
  RadioGroup,
} from "@mui/material";
import { TControl } from "./Input";
import { FieldValues, useController } from "react-hook-form";

export type RadioProps = Omit<FormControlLabelProps, "control">;

type CustomProps = {
  group: RadioProps[];
  size?: "medium" | "small";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type RadioGroupProps<T extends FieldValues> = Omit<
  MuiRadioGroupProps,
  "onChange"
> &
  CustomProps &
  TControl<T>;

function Radio<T extends FieldValues>(props: RadioGroupProps<T>) {
  const {
    name,
    rules,
    control,
    group,
    size = "medium",
    onChange: propsOnChange,
  } = props;
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules,
    control,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (propsOnChange) propsOnChange(event);
  };

  return (
    <FormControl>
      <RadioGroup row name={name} value={value} onChange={handleChange}>
        {group.map(({ value: radioValue, disabled, label }, index) => (
          <FormControlLabel
            key={index}
            value={radioValue}
            label={label}
            control={
              <MuiRadio size={size} value={radioValue} disabled={disabled} />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Radio;
