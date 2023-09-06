"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          role: "user",
          description:
            "Standard user, this role is assigned to everyone who register on our platform and can see all our products, add them to his car and buy them.",
        },
        {
          role: "admin",
          description:
            "This user can do all standard user can do plus add new products,  delete products, delete users, add stock to any product, add categories, delete categories, and create admins.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
