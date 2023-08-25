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
      console.error("Error adding USER: ", err);
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
      console.error("Error when LOGING IN USER: ", err);
      throw err;
    }
  }

  async getUsers(): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "SELECT id, uuid, name, email FROM user";

      const [users] = await connection.promise().execute(query);
      connection.end();

      return users;
    } catch (err) {
      console.error("Error fetching USERS: ", err);
      throw err;
    }
  }

  async getUser(uuid: string): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "SELECT name, email FROM user WHERE uuid = ?";
      const value = [uuid];

      const [user] = await connection.promise().execute(query, value);
      connection.end();

      return user;
    } catch (err) {
      console.error("Error fetching USER: ", err);
      throw err;
    }
  }

  async updateUser(uuid: string, data: Partial<UserEntity>): Promise<any> {
    try {
      const connection = await dbConnection();
      const fieldsToUpdate = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const value = Object.values(data);
      value.push(uuid);
      const query = `UPDATE user SET ${fieldsToUpdate} WHERE uuid = ?`;

      await connection.promise().execute(query, value);

      const updatedUserQuery = "SELECT name, email FROM user WHERE uuid = ?";
      const [updatedUser] = await connection
        .promise()
        .execute(updatedUserQuery, [uuid]);
      connection.end();

      return updatedUser;
    } catch (err) {
      console.error("Error when updating USER:", err);
      throw err;
    }
  }

  async deleteUser(uuid: string): Promise<any> {
    try {
      const connection = await dbConnection();
      const query = "DELETE FROM user WHERE uuid = ?";
      const value = [uuid];

      const [result] = await connection.promise().execute(query, value);
      connection.end();

      if (Array.isArray(result) && result.length === 0) {
        return false;
      }

      return result;
    } catch (err) {
      console.error("Error when deleting USER");
      throw err;
    }
  }
}
