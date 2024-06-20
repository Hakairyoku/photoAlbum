'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "Photos",
    [
      {
        title: "Photo1",
        img: "https://cdn.prod.website-files.com/63a02e61e7ffb565c30bcfc7/659e6c1875a6ef6d59572be3_types%20of%20landscapes.webp",
        albumId: 1,
      },
      {
        title: "Photo2",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9W9vwDNn5X7zAVeDHXgUKo0nBy0pqCaDcw&s",
        albumId: 1,
      },
      {
        title: "Photo3",
        img: "https://cdn.prod.website-files.com/63a02e61e7ffb565c30bcfc7/65ea973aff8798ab070de71f_most%20beautiful%20landscapes%20in%20the%20world.webp",
        albumId: 1,
      },
    ],
    {}
  );
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Photos", null, {});
},
};
