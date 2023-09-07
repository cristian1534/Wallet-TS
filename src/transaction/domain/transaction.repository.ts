import { TransactionEntity } from "./transaction.entity";

export interface TransactionRepository {
  addTransaction(
    transaction: TransactionEntity
  ): Promise<TransactionEntity | null>;
}
