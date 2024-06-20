'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "user1",
        email: "user1@user1",
        password: "password",
      },
      
    ],
    {}
  );
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Users", null, {});
},
};
