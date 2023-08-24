import "dotenv/config";
import mysql from "mysql2";
import { tableSchemas } from "../model/tables.schema";
import { createTable } from "../helper/table.creator";

export const dbConnection = () => {
  return new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection({
      host: process.env.HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    connection.connect((err) => {
      if (err) {
        console.log("Could not connect to MYSQL", err.message);
        reject(err);
      } else {
        console.log("MYSQL Connected");
        createTable(connection, tableSchemas);
        resolve(connection);
      }
    });
  });
};
