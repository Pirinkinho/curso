
// repositories/students.js

import db from './db.js';

export default {
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
