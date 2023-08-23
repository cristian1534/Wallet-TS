import mysql from "mysql2";
import { tableSchemas } from "../model/tables.schema";

export const createTable = async (connection: mysql.Connection, tableSchemas: any[]) => {
  try {
    tableSchemas.forEach((table) => {
      connection.query(table.tableQuery, (err) => {
        if (err) {
          console.log(`Error creating ${table.tableName}`, err.message);
        } else {
          console.log(`Table ${table.tableName} created successfully`);
        }
      });
    });
  } catch (err) {}
};
