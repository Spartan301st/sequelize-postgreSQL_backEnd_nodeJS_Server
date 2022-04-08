'use strict';
// importing the faker library
const faker = require('@faker-js/faker').faker
const totalNumOfUsers = 20;

module.exports = {
    // creating accounts for each user
    async up(queryInterface, Sequelize) {
        // for all accounts
        let accounts = []

        // generating new account
        const generateAccount = (newAccount) => {
            const defaultAccount = {
                accountName: faker.unique(faker.random.word),
                // userId: faker.datatype.number(),
                userId: Math.floor(Math.random() * totalNumOfUsers) +1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            accounts.push({...defaultAccount, ...newAccount})
        }


        // generating exact number of accounts for each available user
        for (let i = 0; i < totalNumOfUsers; i++) {
            // adding the created data to accounts array with modified id data
            generateAccount({
                userId: i + 1
            })
        }

        // custom account generation
        generateAccount({
            accountName: "Gandalf",
            userId: 5,
        })
        // inserting the data given in the accounts array to accounts table
        await queryInterface.bulkInsert('accounts', accounts, {})
    },

    async down(queryInterface, Sequelize) {
        // deleting the entire accounts table
        await queryInterface.bulkDelete('accounts', null, {})
    }
};
