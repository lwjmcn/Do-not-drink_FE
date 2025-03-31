"use client";

import { Grid, Typography } from "@mui/material";
import { getCategories } from "app/_api/expense";
import {
  CategoryDto,
  CategoryListResponseDto,
} from "app/_api/response/expense.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import { useRouter } from "next/navigation";
import ResponseCode from "public/type/response_code";
import { useState, useEffect } from "react";

const Category = () => {
  const router = useRouter();
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
    <Grid container spacing={2} rowGap={4} marginY={3}>
      {categoryList
        .sort((a, b) => b.amount - a.amount)
        .map((category, index) => (
          <Grid
            key={index}
            onClick={() => router.push(`/category/${category.categoryId}`)}
            item
            xs={index < 3 ? 4 : 3}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography fontSize={index < 3 ? 60 : 40}>🥄</Typography>
            <Typography
              variant={index < 3 ? "h6" : "body1"}
              maxWidth={"90px"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {category.name}
            </Typography>
            <Typography variant="caption" color={"text.secondary"}>
              {category.amount.toLocaleString()}
            </Typography>
          </Grid>
        ))}
    </Grid>
  );
};
export default Category;
