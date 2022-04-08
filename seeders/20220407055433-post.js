'use strict';

const faker = require("@faker-js/faker").faker
const totalNumOfUsers= 20;

module.exports = {
  async up (queryInterface, Sequelize) {
    let posts = []

    const generatePost = (newPost) => {
      const defaultPost = {
        title: 'Faded',
        body: 'An Alan Walker single',
        accountId: Math.floor(Math.random() * totalNumOfUsers) +1,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      posts.push({...defaultPost, ... newPost})
    }

    for(let i = 0; i < 100; i++) {
      generatePost()
    }

    generatePost({title: "Top 5 LOTR characters", body: "Gandalf, Frodo, Sauron, Golum, Aragorn"})

    await queryInterface.bulkInsert("posts", posts, {})
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {})
  }
};
