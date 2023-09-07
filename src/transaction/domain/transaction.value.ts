import { TransactionEntity, TransactionType } from "./transaction.entity";

export class TransactionValue implements TransactionEntity {
  uuid: string;
  type: TransactionType;
  amount: number;
  userId: string;
  constructor({
    uuid,
    type,
    amount,
    userId,
  }: {
    uuid: string;
    type: TransactionType;
    amount: number;
    userId: string;
  }) {
    this.uuid = uuid;
    this.type = type;
    this.amount = amount;
    this.userId = userId;
  }
}
