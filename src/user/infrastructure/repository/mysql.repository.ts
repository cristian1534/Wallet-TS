import { AuthEntity, UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { dbConnection } from "../database/mysql";

export class MySQLRepository implements UserRepository {
  async addUser(user: UserEntity): Promise<any> {
    try {
      const connection = await dbConnection();
      const query =
        "INSERT INTO user (uuid, name, email, password) VALUES (?, ?, ?, ?)";
      await connection
        .promise()
        .execute(query, [
          user.uuid,
          user.name,
          user.email,
          user.hashedPassword,
        ]);
      connection.end();
      return user;
    } catch (err) {
      console.error("Error adding user: ", err);
      throw err;
    }
  }

  async logUser(credentials: AuthEntity): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "SELECT * FROM user WHERE email = ?";
      const value = [credentials.email];

      const [rows] = await connection.promise().execute(query, value);
      connection.end();

      if (Array.isArray(rows) && rows.length > 0) {
        const user = rows[0] as UserEntity;
        return user;
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error when LOGING IN USER");
      throw err;
    }
  }
}
