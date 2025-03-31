import ResponseDto from "./response_dto";

export interface TransactionAddResponseDto extends ResponseDto {}

export interface TransactionDto {
  transactionId: number;
  name: string;
  amount: number;
  datetime: string;
  description: string;
}
export interface TransactionListInCategoryResponseDto extends ResponseDto {
  transactions: TransactionDto[];
  totalPage: number;
  totalElements: number;
}

export interface CategoryDto {
  categoryId: number;
  name: string;
  amount: number;
}
export interface CategoryListResponseDto extends ResponseDto {
  categories: CategoryDto[];
}
