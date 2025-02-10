// routes/students.js
const express = require("express");
let router = express.Router();
const controller = require("../controllers/students");
const { studentParamsValidator } = require("../validators/studentValidator");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", studentParamsValidator, controller.create);
router.put("/:id", studentParamsValidator, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
