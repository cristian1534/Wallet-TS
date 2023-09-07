import { TransactionType } from "transaction/domain/transaction.entity";
import { TransactionRepository } from "transaction/domain/transaction.repository";
import { TransactionValue } from "../domain/transaction.value";
import { v4 as uuidGenerator } from "uuid";

export class TransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async addTransaction({
    type,
    amount,
    userId,
  }: {
    type: TransactionType;
    amount: number;
    userId: string;
  }) {
    const uuid = uuidGenerator();
    const transactionValue = new TransactionValue({
      uuid,
      type,
      amount,
      userId,
    });

    const transactionCreated =
      this.transactionRepository.addTransaction(transactionValue);
    return transactionCreated;
  }
}
