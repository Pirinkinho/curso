const db = require("../models");

const getAll = () => db.users.findAll({});
const getById = (id) => db.users.findByPk(id, { include: ["teacher"] });
const getByEmail = (email) => db.users.findOne({ where: { email: email } });
const create = (data) => db.users.create(data);
const update = (id, data) => db.users.update(data, { where: { id: id } });
const remove = (id) => db.users.destroy({ where: { id: id } });

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  remove,
};
