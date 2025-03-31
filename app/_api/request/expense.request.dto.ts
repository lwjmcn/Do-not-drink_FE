export interface TransactionAddRequestDto {
  datetime: string;
  categoryId: number;
  name: string;
  amount: number;
  description: string;
}
