export interface AddExpenseRequestDto {
  datetime: string;
  categoryId: number;
  name: string;
  amount: number;
  description: string;
}
