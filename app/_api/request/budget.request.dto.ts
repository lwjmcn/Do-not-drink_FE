import { ReactionType } from "public/type/reaction";

export interface BudgetSetRequestDto {
  budget: number;
}

export interface ReactToRequestDto {
  reactionType: ReactionType;
  count: number;
}
