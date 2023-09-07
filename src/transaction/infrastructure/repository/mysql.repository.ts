import { TransactionEntity } from "transaction/domain/transaction.entity";
import { TransactionRepository } from "transaction/domain/transaction.repository";
import { dbConnection } from "../../../user/infrastructure/database/mysql";

export class MySQLRepository implements TransactionRepository {
  async addTransaction(transaction: TransactionEntity): Promise<any> {
    try {
      const connection = await dbConnection();
      const query =
        "INSERT INTO transaction (uuid, type, amount, userId) VALUES (?, ?, ?, ?)";

      await connection
        .promise()
        .execute(query, [
          transaction.uuid,
          transaction.type,
          transaction.amount,
          transaction.userId,
        ]);
      connection.end();

      return transaction;
    } catch (err) {
      console.error("Error adding Transaction");
      throw err;
    }
  }
}
