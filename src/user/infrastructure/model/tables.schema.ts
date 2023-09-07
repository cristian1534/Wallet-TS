export const tableSchemas = [
  {
    tableName: "user",
    tableQuery: `
      CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uuid VARCHAR(50),
        name VARCHAR(50),
        email VARCHAR(50),
        password VARCHAR(200)
      )
    `,
  },
  {
    tableName: "card",
    tableQuery: `
      CREATE TABLE IF NOT EXISTS card (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uuid VARCHAR(50),
        type VARCHAR(50),
        cardNumber BIGINT(16),
        propertyUser VARCHAR(50),    
        userId VARCHAR(50)
      )
    `,
  },
  {
    tableName: "transaction",
    tableQuery: `
      CREATE TABLE IF NOT EXISTS transaction (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uuid VARCHAR(50),
        type VARCHAR(50),
        amount BIGINT(16),
        userId VARCHAR(50)
      )
    `,
  },
];
