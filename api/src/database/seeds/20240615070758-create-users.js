"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "user1",
        email: "user1@email.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user2",
        email: "user2@email.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null);
  },
};
