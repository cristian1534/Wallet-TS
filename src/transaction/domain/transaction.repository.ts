import { TransactionEntity } from "./transaction.entity";

export interface TransactionRepository {
  addTransaction(
    transaction: TransactionEntity
  ): Promise<TransactionEntity | null>;

  getTransactions(): Promise<TransactionEntity[] | null>;
  deleteTransaction(uuid: string): Promise<TransactionEntity | null>;
}
