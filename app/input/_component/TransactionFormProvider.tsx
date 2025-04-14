"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseBody } from "app/_api/response/response_dto";
import ResponseCode from "public/type/response_code";
import { useRouter } from "next/navigation";
import { TransactionAddResponseDto } from "app/_api/response/expense.response.dto";
import { addTransaction } from "app/_api/expense";

const addTransactionFormSchema = z.object({
  datetime: z
    .string()
    .trim()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "유효한 날짜를 입력해주세요.",
    }),
  categoryId: z.coerce.number().int().positive(),
  name: z.string().trim().min(1, { message: "제목을 입력해주세요." }),
  amount: z.coerce.number().int().positive().max(100000000, {
    message: "1억 이상은 입력할 수 없습니다.",
  }),
  description: z
    .string()
    .trim()
    .max(100, { message: "100자 이하로 입력해주세요." }),
});

export type IAddTransactionForm = z.infer<typeof addTransactionFormSchema>;

const defaultValues: IAddTransactionForm = {
  // YYYY-MM-DDTHH:mm
  datetime: new Date().toISOString().slice(0, 16),
  categoryId: 1,
  name: "",
  amount: 0,
  description: "",
};

const TransactionFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useForm<IAddTransactionForm>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(addTransactionFormSchema),
  });
  const { handleSubmit } = form;

  const router = useRouter();
  const addTransactionResponse = (
    responseBody: ResponseBody<TransactionAddResponseDto>
  ): void => {
    if (!responseBody) return;
    const { code, message } = responseBody as TransactionAddResponseDto;

    if (code == ResponseCode.SUCCESS) {
      console.log("addTransaction: ", message);
      router.push("/add-transaction/complete");
      return;
    } else {
      console.log("addTransaction: ", message);
      router.push("/add-transaction/fail");
      return;
    }
  };
  const onSubmit = async (data: IAddTransactionForm) => {
    // console.log(data);
    // console.log(JSON.stringify(data));

    await addTransaction(data).then(addTransactionResponse);
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

export default TransactionFormProvider;
