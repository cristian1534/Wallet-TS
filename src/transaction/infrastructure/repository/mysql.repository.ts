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

  async getTransactions(): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "SELECT * FROM transaction";
      const [transactions] = await connection.promise().execute(query);
      connection.end();

      return transactions;
    } catch (err) {
      console.error("Error fetching Transaction");
      throw err;
    }
  }

  async deleteTransaction(uuid: string): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "DELETE FROM transaction WHERE uuid = ?";
      const value = [uuid];

      const [deletedTransaction] = await connection
        .promise()
        .execute(query, value);
      if (
        Array.isArray(deletedTransaction) &&
        deletedTransaction.length === 0
      ) {
        return false;
      }

      return deletedTransaction;
    } catch (err) {
      console.error("Error deleting Transaction");
      throw err;
    }
  }
}
