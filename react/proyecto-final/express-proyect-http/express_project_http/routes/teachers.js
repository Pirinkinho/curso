// routes/teachers.js
const express = require("express");
let router = express.Router();
const controller = require("../controllers/teachers");
const { teacherParamsValidator } = require("../validators/teacherValidator");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", teacherParamsValidator, controller.create);
router.put("/:id", teacherParamsValidator, controller.update);
router.delete("/:id", controller.remove);

router.get("/:teacher_id/students", controller.getStudents);

module.exports = router;
