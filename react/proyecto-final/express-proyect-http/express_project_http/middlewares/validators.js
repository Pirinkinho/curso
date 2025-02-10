const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(400).send({ errors: err.array() });
  }
};

const validateResultHtml = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.render("error", { 
      originalUrl: req.originalUrl,
      withErrors: true,
      errors: err.array() });
  }
};

module.exports = {
  validateResult,
  validateResultHtml,
};
