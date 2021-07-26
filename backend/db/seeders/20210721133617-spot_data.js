"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          userId: 1,
          address: "Willow, New York, United States",
          city: "Willow",
          state: "New York",
          country: "United States",
          price: "382",
          name: "Willow Treehouse",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          address: "Atlanta, Georgia, United States",
          city: "Atlanta",
          state: "Georgia",
          country: "United States",
          price: "389",
          name: "Secluded Intown Treehouse",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          address: "24440 Bergerac City, Bergerac France",
          city: "Bergerac City",
          state: "Bergerac",
          country: "France",
          price: 150,
          name: "Chateaux Dans les Arbres",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          address: "Éauze, Languedoc-Roussillon-Midi-Pyrénées, France",
          city: "Éauze",
          state: "Languedoc-Roussillon-Midi-Pyrénées",
          country: "France",
          price: 225,
          name: "Cabane perchée Tree house",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          address: "Columbia Falls, Montana, United States",
          city: "Columbia Falls",
          state: "Montana",
          country: "United States",
          price: 449,
          name: "Meadowlark Treehouse at Montana Treehouse Retreat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          address: "San Jose, California, United States",
          city: "San Jose",
          state: "California",
          country: "United States",
          price: 362,
          name: "Treehouse , San Jose",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Spots", null, {});
  },
};
