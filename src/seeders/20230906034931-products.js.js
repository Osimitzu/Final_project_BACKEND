"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Product-1",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-2",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-3",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-4",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-5",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-6",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-7",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-8",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-9",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-10",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-11",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-12",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-13",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-14",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-15",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-16",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-17",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-18",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-19",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-20",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-21",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-22",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-23",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-24",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-25",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-26",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-27",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-28",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-29",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-30",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-31",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
        {
          name: "Product-32",
          description:
            "High-quality product with an outstanding value-for-money proposition.",
          price: 99.99,
          available_qty: 20,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
