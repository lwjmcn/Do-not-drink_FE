"use client";

import {
  Button,
  Autocomplete,
  Stack,
  Typography,
  Paper,
  Popper,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import Input from "@component/Input";
import { useRouter } from "next/navigation";
import { IAddTransactionForm } from "./TransactionFormProvider";
import { useRouterWrapper } from "app/home/_component/page_transition/RouterWrapperContext";
import CategoryChip from "./CategoryChip";

export default function TransactionForm() {
  const router = useRouter();
  const { setTransitionDisable } = useRouterWrapper();

  const { trigger } = useFormContext<IAddTransactionForm>();

  const onClickNext = async () => {
    // 이메일 중복 확인은 마지막에 백엔드에서 진행
    const isValid = await trigger([
      "datetime",
      "categoryId",
      "name",
      "amount",
      "description",
    ]);
    if (!isValid) return;

    setTransitionDisable(true);
    router.push("/home");
  };

  return (
    <Stack direction="column" spacing={4}>
      <Stack direction={"column"} spacing={1}>
        <Input
          name="datetime"
          label="날짜"
          type="datetime-local"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Autocomplete
          options={[
            { categoryId: 1, name: "식비" },
            { categoryId: 2, name: "교통비" },
            { categoryId: 3, name: "문화생활비" },
          ]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <Input
              {...params}
              name="categoryId"
              label="카테고리"
              type="text"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              style={{
                padding: 0,
                margin: 0,
                backgroundColor: "transparent",
                marginRight: 4,
              }}
            >
              <CategoryChip name={option.name} />
            </li>
          )}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => {
              const { key, ...rest } = getTagProps({ index });
              return <CategoryChip key={key} name={option.name} />;
            });
          }}
          ListboxProps={{
            style: {
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#fff",
              padding: 0,
              gap: 0,
              margin: 0,
            },
          }}
        />
        <Input
          name="name"
          label="제목"
          type="text"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Input
          name="amount"
          label="금액"
          type="number"
          InputProps={{
            endAdornment: <Typography>원</Typography>,
          }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Input
          name="description"
          label="메모"
          type="text"
          multiline
          maxRows={4}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Stack>
      <Button type="submit" variant="text" sx={{ bgcolor: "#fff6e1" }}>
        <Typography variant="button" color="#000">
          확인
        </Typography>
      </Button>
    </Stack>
  );
}
