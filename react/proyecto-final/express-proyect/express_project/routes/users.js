// routes/users.js
const express = require("express");
let router = express.Router();
const controller = require("../controllers/users");
const { userParamsValidator } = require("../validators/userValidator");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", userParamsValidator, controller.create);
router.put("/:id", userParamsValidator, controller.update);
router.delete("/:id", controller.remove);

router.get("/:id/active", controller.getActive);
router.post("/:id/active", controller.updateActive);

module.exports = router;
