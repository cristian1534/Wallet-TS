import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { dbConnection } from "../database/mysql";

export class MySQLRepository implements UserRepository {
  async addUser(user: UserEntity): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
      const result = await connection
        .promise()
        .execute(query, [user.name, user.email, user.password]);
      connection.end();
      return result;
    } catch (err) {
      console.error("Error adding user: ", err);
      throw err;
    }
  }
}
