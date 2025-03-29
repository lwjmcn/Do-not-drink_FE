import { Chip, ChipProps } from "@mui/material";

interface CategoryChipProps extends ChipProps {
  name: string;
}
export default function CategoryChip({ name, ...props }: CategoryChipProps) {
  return <Chip label={name} size="small" {...props} />;
}
