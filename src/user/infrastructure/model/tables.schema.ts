export const tableSchemas = [
  {
    tableName: "user",
    tableQuery: `
      CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uuid VARCHAR(50),
        name VARCHAR(50),
        email VARCHAR(50),
        password VARCHAR(50)
      )
    `,
  },
];
