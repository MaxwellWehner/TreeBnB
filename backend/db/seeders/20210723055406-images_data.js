"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Images",
      [
        {
          spotId: 1,
          url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/treehouse-retnals-screen-shot-2019-01-07-at-11-16-42-am-1559231613.jpg?crop=0.454xw:1.00xh;0.301xw,0&resize=980:*",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/d7047b62-9a57-4478-9bb2-18885cd718f5.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/582da6b8-099b-4c05-906b-1b027258a968.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/c2f9f7b9-e26e-4135-b1cf-c7917b542cfd.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/01307408-9146-43a7-8151-2e6ad1075e6f.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/4d9698aa-d19d-4526-a1c4-63c50dc60c79.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/6ced5146-900a-4e51-9c0a-e5ab5a5b5afe.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/treehouse-rentals-screen-shot-2019-05-30-at-12-21-17-pm-1559233701.jpg?crop=0.449xw:1.00xh;0.298xw,0&resize=980:*",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/76882116/f960e173_original.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/2b595ae5-5084-4a01-8278-d2cc1197e15c.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/21612123/a60f3263_original.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/5fc8b312-b262-4473-8771-69dd27909881.jpg?im_w=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tree-1624565511.png?crop=0.9773123909249564xw:1xh;center,top&resize=980:*",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/40/60/4c/chateaux-dans-les-arbres.jpg?w=1200&h=-1&s=1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-s/03/30/dc/13/chateaux-dans-les-arbres.jpg?w=600&h=-1&s=1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-s/03/30/da/87/chateaux-dans-les-arbres.jpg?w=600&h=-1&s=1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-s/03/30/d9/d6/chateaux-dans-les-arbres.jpg?w=600&h=-1&s=1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Images", null, {});
  },
};
