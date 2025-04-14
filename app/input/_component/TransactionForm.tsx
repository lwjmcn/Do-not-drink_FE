"use client";

import { Button, Autocomplete, Stack, Typography } from "@mui/material";
import Input from "@component/Input";
import CategoryChip from "./CategoryChip";
import { getCategories } from "app/_api/expense";
import { ResponseBody } from "app/_api/response/response_dto";
import {
  CategoryDto,
  CategoryListResponseDto,
} from "app/_api/response/expense.response.dto";
import ResponseCode from "public/type/response_code";
import { useEffect, useState } from "react";

export default function TransactionForm() {
  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);

  const getCategoriesApi = async () => {
    await getCategories().then(getCategoriesApiResponse);
  };
  const getCategoriesApiResponse = (
    responseBody: ResponseBody<CategoryListResponseDto>
  ) => {
    if (!responseBody) return;

    const { code, message, categories } =
      responseBody as CategoryListResponseDto;

    if (code == ResponseCode.SUCCESS) {
      setCategoryList(categories);
      console.log("Categories: ", categories);
    } else {
      console.log("getCategories: ", message);
    }
  };

  useEffect(() => {
    getCategoriesApi();
  }, []);

  return (
    <Stack direction="column" spacing={4}>
      <Stack direction={"column"} spacing={1}>
        <Input
          name="datetime"
          label="날짜"
          type="datetime-local"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {/* <Autocomplete
          options={categoryList} // TODO category 403
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
        /> */}
        <Input
          name="categoryId"
          label="카테고리"
          type="number"
          select
          slotProps={{ inputLabel: { shrink: true } }}
        >
          {categoryList.map((item, index) => (
            <option key={index} value={item.categoryId}>
              {item.name}
            </option>
          ))}
        </Input>
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
          inputProps={{ inputMode: "numeric" }}
          InputProps={{
            endAdornment: (
              <Typography variant="body2" sx={{ color: "#717171" }}>
                원
              </Typography>
            ),
          }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Input
          name="description"
          label="메모"
          type="text"
          required={false}
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
