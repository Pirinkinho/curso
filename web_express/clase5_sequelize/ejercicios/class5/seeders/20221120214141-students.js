'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('students', [
      {
        name: 'John',
        last_name: 'Doe',
        date_of_birth: '1987-04-27',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Joaquin',
        last_name: 'Torres',
        date_of_birth: '2014-09-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}); 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('students', null, {});
  }
};
