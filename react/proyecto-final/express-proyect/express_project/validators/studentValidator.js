const { check } = require("express-validator");
const { validateResult } = require("../middlewares/validators");

const studentParamsValidator = [
  check("dni").exists().notEmpty(),
  check("name").exists().notEmpty(),
  check("last_name").exists().notEmpty(),
  check("date_of_birth").exists().notEmpty().isDate(),
  check("teacher_id").exists().notEmpty().isNumeric(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  studentParamsValidator,
};
