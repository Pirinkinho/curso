"use strict";
const { hashPassword } = require("../helpers/auth");

/** @type {import('sequelize-cli').Migration} */

const reset_sequences = async (db) => {
  await db.query("select setval('users_id_seq', COALESCE(max(id),0)+1, FALSE) from users");
  await db.query("select setval('teachers_id_seq', COALESCE(max(id),0)+1, FALSE) from teachers");
  await db.query("select setval('students_id_seq', COALESCE(max(id),0)+1, FALSE) from students");
};
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const db = queryInterface.sequelize;
    await reset_sequences(db);
    
    const pass1 = await hashPassword("1234");
    const pass2 = await hashPassword("5678");
    await queryInterface.insert(db.users, "users", {
      id: 1,
      email: "user1@veridas.com",
      password: pass1,
      active: true,
      type: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await queryInterface.insert(db.users, "users", {
      id: 2,
      email: "user2@veridas.com",
      password: pass2,
      active: true,
      type: "teacher",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await queryInterface.insert(db.users, "users", {
      id: 3,
      email: "user3@veridas.com",
      password: pass1,
      active: true,
      type: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await queryInterface.insert(db.users, "users", {
      id: 4,
      email: "user4@veridas.com",
      password: pass1,
      active: true,
      type: "teacher",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await queryInterface.insert(db.users, "users", {
      id: 5,
      email: "user5@veridas.com",
      password: pass1,
      active: false,
      type: "teacher",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await queryInterface.insert(db.teachers, "teachers", {
      id: 1,
      dni: "99999999T",
      name: "Fausto",
      last_name: "López",
      date_of_birth: "1987-04-25",
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await queryInterface.insert(db.teachers, "teachers", {
      id: 2,
      dni: "88888888T",
      name: "John",
      last_name: "Doe",
      date_of_birth: "1987-04-25",
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await queryInterface.bulkInsert("students", [
      {
        dni: "11111111A",
        name: "Enrique",
        last_name: "Jara",
        date_of_birth: "1997-05-26",
        teacher_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "22222222B",
        name: "John",
        last_name: "Doe",
        date_of_birth: "1977-04-29",
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "33333333C",
        name: "Selene",
        last_name: "Smith",
        date_of_birth: "2007-11-14",
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await reset_sequences(db);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("students", null, {});
    await queryInterface.bulkDelete("teachers", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
