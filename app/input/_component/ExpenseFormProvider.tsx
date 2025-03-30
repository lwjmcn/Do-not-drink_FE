"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useRouter } from "next/navigation";
import { AddExpenseResponseDto } from "app/_api/response/expense.response.dto";

const addExpenseFormSchema = z.object({
  datetime: z.string().trim().datetime(),
  categoryId: z.number().int().positive(),
  name: z.string().trim().min(1, { message: "제목을 입력해주세요." }),
  amount: z.number().int().min(0, { message: "금액을 입력해주세요." }),
  description: z
    .string()
    .trim()
    .max(100, { message: "100자 이하로 입력해주세요." }),
});

export type IAddExpenseForm = z.infer<typeof addExpenseFormSchema>;

const defaultValues: IAddExpenseForm = {
  datetime: new Date().toLocaleString("ko-KR"),
  categoryId: 1,
  name: "",
  amount: 0,
  description: "",
};

const ExpenseFormProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<IAddExpenseForm>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(addExpenseFormSchema),
  });
  const { handleSubmit } = form;

  const router = useRouter();
  const addExpenseResponse = (
    responseBody: ResponseBody<AddExpenseResponseDto>
  ): void => {
    if (!responseBody) return;
    const { code } = responseBody;

    let message = "";
    if (code == ResponseCode.DATABASE_ERROR) {
      message = "데이터베이스 오류입니다.";
      alert(message);
      router.push("/add-expense/fail");
      return;
    }
    if (code == ResponseCode.SUCCESS) {
      message = "지출이 등록되었습니다";
      alert(message);
      router.push("/add-expense/complete");
      return;
    }
  };
  const onSubmit = async (data: IAddExpenseForm) => {
    console.log(data);
    alert(JSON.stringify(data));

    // await addExpense(data).then(addExpenseFormSchema);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default ExpenseFormProvider;
