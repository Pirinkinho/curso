const express = require("express");
let router = express.Router();
const controller = require("../controllers/auth");
const { loginParamsValidator } = require("../validators/authValidator");

router.get("/login", controller.getLogin);
router.post("/login", loginParamsValidator, controller.login);
router.post("/logout", controller.logout)

router.post("/token", loginParamsValidator, controller.getToken);

module.exports = router;
