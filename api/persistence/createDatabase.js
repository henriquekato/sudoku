const mysql = require("mysql2/promise");
require("dotenv").config();

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\`;`
  );
}

module.exports = createDatabase;
