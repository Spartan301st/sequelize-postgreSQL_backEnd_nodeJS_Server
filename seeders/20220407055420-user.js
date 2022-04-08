'use strict';
// faker library for generating fake data
const faker = require('@faker-js/faker').faker;
// how many users to generate
const TOTAL_USERS = 20;
// commonJS way of exporting by default
module.exports = {
    // for adding data to users table
    async up(queryInterface, Sequelize) {
        // an array for storing all the users
        let users = [];
        // function for generating custom users
        const addUser = (newUser) =>  {
            // default data
            const user = {
                // generating random word for username
                userName: faker.unique(faker.random.word),
                // generating an email for the user
                email: faker.internet.email(),
                // for tracking whether the given data was deleted
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            // adding new user to users with an option of custom data passing
            users.push({...user, ...newUser});
        }
        // generating the given number of users by adding the data grabbed from the faker library to users array
        for (let i = 0; i < TOTAL_USERS; i++) {
            addUser();
        }

        // passing a custom data
        addUser({
            userName: 'admin'
        })

        // inserting the array to users table
        await queryInterface.bulkInsert('users', users, {})
    },

    // for deleting data from users table
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};

exports.totalNumOfUsers = TOTAL_USERS
