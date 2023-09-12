import { CardEntity } from "../../domain/card.entity";
import { CardRepository } from "../../domain/card.repository";
import { dbConnection } from "../../../user/infrastructure/database/mysql";

export class MySQLRepository implements CardRepository {
  async addCard(card: CardEntity): Promise<any> {
    try {
      const connection = await dbConnection();
      const query =
        "INSERT INTO card (uuid, type, cardNumber, propertyUser, userId, balance) VALUES (?, ?, ?, ?, ?, ?)";

      await connection
        .promise()
        .execute(query, [
          card.uuid,
          card.type,
          card.cardNumber,
          card.propertyUser,
          card.userId,
          card.balance,
        ]);
      connection.end();

      return card;
    } catch (err) {
      console.error("Error adding CARD");
      throw err;
    }
  }

  async getCards(): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "SELECT * FROM card";

      const [cards] = await connection.promise().execute(query);
      connection.end();

      return cards;
    } catch (err) {
      console.error("Error fetching CARDS");
      throw err;
    }
  }

  async getCard(uuid: string): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "SELECT * FROM card WHERE uuid = ?";
      const value = [uuid];

      const [card] = await connection.promise().execute(query, value);
      return card;
    } catch (err) {
      console.error("Error fetching CARD");
      throw err;
    }
  }

  async updateCard(uuid: string, data: Partial<CardEntity>): Promise<any> {
    try {
      const connection = await dbConnection();
      const fieldsToUpdate = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const value = Object.values(data);
      value.push(uuid);

      const query = `UPDATE card SET ${fieldsToUpdate} WHERE uuid = ?`;

      await connection.promise().execute(query, value);

      const updatedCardQuery = "SELECT * FROM card WHERE uuid = ?";
      const [updatedCard] = await connection
        .promise()
        .execute(updatedCardQuery, [uuid]);
      connection.end();

      return updatedCard;
    } catch (err) {
      console.error("Error updating CARD");
      throw err;
    }
  }

  async deleteCard(uuid: string): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "DELETE FROM card WHERE uuid = ?";
      const value = [uuid];

      const [result] = await connection.promise().execute(query, value);
      connection.end();

      if (Array.isArray(result) && result.length === 0) {
        return false;
      }

      return result;
    } catch (err) {
      console.error("Error deleting CARD");
      throw err;
    }
  }
}
