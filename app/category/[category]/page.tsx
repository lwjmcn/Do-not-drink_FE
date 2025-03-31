"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { getTransactionsInCategory } from "app/_api/expense";
import {
  TransactionDto,
  TransactionListInCategoryResponseDto,
} from "app/_api/response/expense.response.dto";
import { ResponseBody } from "app/_api/response/response_dto";
import { useParams } from "next/navigation";
import ResponseCode from "public/type/response_code";
import { useEffect, useState } from "react";

const History = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState<string>("");
  const [transactionList, setTransactionList] = useState<TransactionDto[]>([]);

  const getTransactionsInCategoryApi = async () => {
    await getTransactionsInCategory(Number(categoryId), 0, 20).then(
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
      setTransactionList(transactions);
      setCategoryName(categoryName);
    } else {
      console.log("getTransactionsInCategory: ", message);
    }
  };

  useEffect(() => {
    getTransactionsInCategoryApi();
  }, []);

  return (
    <Box padding={2}>
      <Box>
        <Typography fontSize={60} marginLeft={-1}>
          🥄
        </Typography>
        <Typography variant={"h2"}>{categoryName}</Typography>
        <Typography variant="caption" color={"text.secondary"}>
          총{" "}
          {transactionList
            .map((item) => item.amount)
            .reduce((a, b) => a + b)
            .toLocaleString()}
          원을 사용했어요.
        </Typography>
      </Box>
      <Divider
        sx={{
          opacity: 0.5,
          border: "2px solid",
          borderStyle: "dotted",
          marginTop: 4,
        }}
      />
      <List>
        {transactionList
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
          ))}
      </List>
    </Box>
  );
};
export default History;
