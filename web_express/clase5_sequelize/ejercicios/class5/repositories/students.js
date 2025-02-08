// repositories/students.js
const db = require("../models"); // Forma abreviada de models/index.js

module.exports = {
  getAll() {
    return db.students.findAll({});
  },
  getById(id) {
    return db.students.findByPk(id);
  },
  getByEmail(email) {
    return db.students.findOne({
        where: {
            email: email
        }
    })
  },
  insert(data) {
    return db.students.create(data);
  },
};
