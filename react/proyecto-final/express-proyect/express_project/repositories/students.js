const db = require("../models");

const getAll = () => db.students.findAll({});
const getByTeacherId = (teacher_id) =>
  db.students.findAll({
    where: { teacher_id: teacher_id },
    include: ["teacher"],
    order: [["date_of_birth", "ASC"]],
  });
const getById = (id) => db.students.findByPk(id, { include: ["teacher"] });
const create = (data) => db.students.create(data);
const update = (id, data) => db.students.update(data, { where: { id: id } });
const remove = (id) => db.students.destroy({ where: { id: id } });

module.exports = {
  getAll,
  getByTeacherId,
  getById,
  create,
  update,
  remove,
};
