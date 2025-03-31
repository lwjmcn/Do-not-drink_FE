import axiosInstance from "public/util/axios";
import {
  TransactionAddResponseDto,
  CategoryListResponseDto,
  TransactionListInCategoryResponseDto,
} from "./response/expense.response.dto";
import { TransactionAddRequestDto } from "./request/expense.request.dto";
import { responseHandler, errorHandler } from "./api";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`;

export const getCategories = async () => {
  const result = await axiosInstance
    .get(`${API_URL}/categories`)
    .then(responseHandler<CategoryListResponseDto>)
    .catch(errorHandler);
  return result;
};

export const addTransaction = async (requestBody: TransactionAddRequestDto) => {
  const result = await axiosInstance
    .post(`${API_URL}/transactions`, requestBody)
    .then(responseHandler<TransactionAddResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getTransactionsInCategory = async (
  categoryId: number,
  page: number,
  size: number
) => {
  const result = await axiosInstance
    .get(`${API_URL}/transactions`, {
      params: { categoryId, page, size },
    })
    .then(responseHandler<TransactionListInCategoryResponseDto>)
    .catch(errorHandler);
  return result;
};
