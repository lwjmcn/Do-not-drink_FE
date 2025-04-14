"use client";

import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { getCategories, getTransactionsInCategory } from "app/_api/expense";
import {
  CategoryDto,
  CategoryListResponseDto,
  TransactionDto,
  TransactionListInCategoryResponseDto,
} from "app/_api/response/expense.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import { useRouter } from "next/navigation";
import ResponseCode from "public/type/response_code";
import { useEffect, useState } from "react";

const ExpenseList = () => {
  const router = useRouter();

  const [categoryList, setCategoryList] = useState<CategoryDto[] | undefined>(
    undefined
  );
  const [transactionList, setTransactionList] = useState<TransactionDto[]>([]);

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
  const getTransactionsInCategoryApi = async (categoryId: number) => {
    await getTransactionsInCategory(categoryId, 0, 20).then(
      getTransactionsInCategoryApiResponse
    );
  };
  const getTransactionsInCategoryApiResponse = (
    responseBody: ResponseBody<TransactionListInCategoryResponseDto>
  ) => {
    if (!responseBody) return;
    const { code, message, categoryName, transactions } =
      responseBody as TransactionListInCategoryResponseDto;
    if (code == ResponseCode.SUCCESS) {
      console.log("TransactionsInCategory: ", transactions);
      setTransactionList((prev) => {
        const newTransactionList = [...prev, ...transactions];
        const uniqueTransactionList = Array.from(
          new Map(
            newTransactionList.map((item) => [item.transactionId, item])
          ).values()
        );
        return uniqueTransactionList;
      });
    } else {
      console.log("getTransactionsInCategory: ", message);
    }
  };

  useEffect(() => {
    if (!categoryList) getCategoriesApi();
    if (categoryList && categoryList.length > 0) {
      categoryList.forEach((category) => {
        getTransactionsInCategoryApi(Number(category.categoryId));
      });
    }
  }, [categoryList]);

  return (
    <Box width={"100%"} height={"70vh"}>
      <Divider
        sx={{
          opacity: 0.5,
          border: "2px solid",
          borderStyle: "dotted",
          marginTop: 4,
        }}
      />
      <Typography variant="h6" marginY={2} fontWeight={600}>
        카테고리
      </Typography>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={1}
        flex={1}
        maxWidth={400}
        width={"100%"}
        direction={"row"}
        alignSelf={"center"}
        alignItems={"stretch"}
      >
        {categoryList &&
          categoryList
            .sort((a, b) => b.amount - a.amount)
            .map((item) => (
              <Grid key={item.categoryId} size={3}>
                <Typography fontSize={40}>🥄</Typography>
                <Typography
                  variant={"body2"}
                  fontWeight={600}
                  maxWidth={"90px"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {item.name}
                </Typography>
                <Typography variant="caption" color={"#717171"}>
                  {item.amount.toLocaleString()}원 사용
                </Typography>
              </Grid>
            ))}
      </Grid>
      <Divider
        sx={{
          opacity: 0.5,
          border: "2px solid",
          borderStyle: "dotted",
          marginTop: 4,
        }}
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" marginY={2} fontWeight={600}>
          최근 지출 내역
        </Typography>
        <Button
          variant="text"
          onClick={() => router.push("/input")}
          sx={{
            minWidth: 40,
            height: 30,
            borderRadius: 4,
            bgcolor: "#000",
          }}
        >
          <Typography variant="button" color="#fff">
            추가하기
          </Typography>
        </Button>
      </Stack>
      <List>
        {transactionList.length == 0 ? (
          <Stack alignItems={"center"} paddingY={10}>
            <Typography variant="caption" color="#717171">
              아직 지출 내역이 없어요.
            </Typography>
          </Stack>
        ) : (
          transactionList
            .sort(
              (a, b) =>
                new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
            )
            .map((item) => (
              <ListItem
                key={item.transactionId}
                sx={{
                  paddingX: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
                divider
                secondaryAction={
                  <ListItemText
                    primary={`${item.amount.toLocaleString()}
                원`}
                  />
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={item.datetime.replace(/-/g, ".")}
                />
              </ListItem>
            ))
        )}
      </List>
    </Box>
  );
};
export default ExpenseList;
