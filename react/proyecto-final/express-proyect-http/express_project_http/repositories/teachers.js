const db = require("../models");

const getAll = () => db.teachers.findAll({});
const getById = (id) =>
  db.teachers.findByPk(id, { include: ["user", "students"] });
const getByUserId = (user_id) =>
  db.teachers.findOne({
    where: { user_id: user_id },
    include: ["user", "students"],
  });
const getByDni = (dni) =>
  db.teachers.findOne({
    where: { dni: dni },
    include: ["user", "students"],
  });
const create = (data) => db.teachers.create(data);
const update = (id, data) => db.teachers.update(data, { where: { id: id } });
const remove = (id) => db.teachers.destroy({ where: { id: id } });

module.exports = {
  getAll,
  getById,
  getByUserId,
  getByDni,
  create,
  update,
  remove,
};
