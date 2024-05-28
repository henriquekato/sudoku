const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    dialect: "postgres",
    host: process.env.HOST,
    port: process.env.PORT,
  }
);

module.exports = sequelize;
