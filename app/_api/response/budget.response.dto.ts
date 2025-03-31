import ResponseDto from "./response_dto";

export interface BudgetRemainingResponseDto extends ResponseDto {
  remains: number;
}

export interface BudgetSetResponseDto extends ResponseDto {}

export interface ReactionDto {
  reactionType: string;
  count: number;
}
export interface ReactionCurrentResponseDto extends ResponseDto {
  reactions: ReactionDto[];
}

export interface ReactToResponseDto extends ResponseDto {}
