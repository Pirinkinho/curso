const { check } = require("express-validator");
const { validateResultHtml } = require("../middlewares/validators");

const loginParamsValidator = [
  check("username").exists().notEmpty(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    validateResultHtml(req, res, next);
  },
];

module.exports = {
  loginParamsValidator,
};
