'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "Albums",
    [
      {
        title: "Album1",
        img: "https://avatars.mds.yandex.net/i?id=c881f9a8e69de39763b764715e52196b2274a032-10274729-images-thumbs&n=13",
        userId: 1,
      },
      {
        title: "Album2",
        img: "https://avatars.mds.yandex.net/i?id=c42445990d35404f66c5aa40d4cf5e526e6f21ed-11512952-images-thumbs&n=13",
        userId: 1,
      },
      {
        title: "Album3",
        img: "https://avatars.mds.yandex.net/i?id=3b2ded6d5f7089b7633ca3154d8d5a67512bb9a9-8568171-images-thumbs&n=13",
        userId: 1,
      },
    ],
    {}
  );
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Albums", null, {});
},
};