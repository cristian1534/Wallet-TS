import { CardEntity } from "../../domain/card.entity";
import { CardRepository } from "../../domain/card.repository";
import { dbConnection } from "../../../user/infrastructure/database/mysql";

export class MySQLRepository implements CardRepository {
  async addCard(card: CardEntity): Promise<any> {
    try {
      const connection = await dbConnection();
      const query =
        "INSERT INTO card (uuid, type, cardNumber, propertyUser, userId) VALUES (?, ?, ?, ?, ?)";

      await connection
        .promise()
        .execute(query, [
          card.uuid,
          card.type,
          card.cardNumber,
          card.propertyUser,
          card.userId,
        ]);
      connection.end();

      return card;
    } catch (err) {
      console.error("Error adding CARD");
      throw err;
    }
  }
}
