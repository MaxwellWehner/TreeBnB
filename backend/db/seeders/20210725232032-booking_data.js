"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Bookings",
      [
        {
          spotId: 3,
          userId: 1,
          startDate: new Date(2021, 7, 25, 12, 10, 0, 0),
          endDate: new Date(2021, 7, 28, 12, 10, 0, 0),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bookings", null, {});
  },
};
