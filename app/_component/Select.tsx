import React, { ReactNode } from "react";
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { TControl } from "./Input";
import { FieldValues, useController } from "react-hook-form";

export interface ISelectItem {
  label: ReactNode;
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

type CustomSelectProps<T> = {
  selectList: ISelectItem[];
  placeholder: string;
  onChange?: (event: SelectChangeEvent<T>) => void;
};

// MuiSelectProps, useController, custom props
type SelectProps<T extends FieldValues> = Omit<
  MuiSelectProps,
  "onChange" | "placeholder" // 를 제외하고
> &
  CustomSelectProps<T> &
  TControl<T>;

function Select<T extends FieldValues>(props: SelectProps<T>) {
  const {
    name,
    rules,
    control,
    selectList,
    placeholder,
    onChange: propsOnChange,
  } = props;

  const {
    field: { value, onChange, onBlur },
  } = useController({ name, rules, control });

  const handleChange = (event: SelectChangeEvent<T>) => {
    onChange(event);
    if (propsOnChange) propsOnChange(event);
  };

  const renderValue = () =>
    value
      ? selectList.find((item) => item.value === value)?.label
      : placeholder;

  return (
    <MuiSelect
      value={value}
      renderValue={renderValue}
      onChange={handleChange}
      onBlur={onBlur}
      sx={{
        width: "220px",
        padding: "8px",
        "& .MuiSelect-outlined": { padding: 0 },
      }}
    >
      {selectList.map(({ label, value, disabled }, index) => (
        <MenuItem key={index} value={value} disabled={disabled ?? false}>
          {label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}

export default Select;
