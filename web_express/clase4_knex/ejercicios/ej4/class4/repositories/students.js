// repositories/students.js
const db = require("./db");

module.exports = {
  getAll() {
    return db("students");
  },
  getById(id) {
    return db("students").first().where({ id: id})
  },
  insert(data) {
    return db("students").insert(data);
  },
};
