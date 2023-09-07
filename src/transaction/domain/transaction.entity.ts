export type TransactionType = "Transfer" | "Payment";

export interface TransactionEntity {
  uuid: string;
  type: TransactionType;
  amount: number;
  userId: string;
}
