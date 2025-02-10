// routes/usersFront.js
const express = require("express");
let router = express.Router();
const { isAuth, isAdmin } = require("../middlewares/auth");
const controller = require("../controllers/users");
const { signUpParamsValidator } = require("../validators/userValidator");

router.get("/users", isAuth, isAdmin, controller.getUsers);
router.post("/signup", signUpParamsValidator, controller.signUp);

module.exports = router;
