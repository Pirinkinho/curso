const express = require("express");
let router = express.Router();
const { isAuthRedirect } = require("../middlewares/auth");
const controller = require("../controllers/home");

router.get("/home", isAuthRedirect, controller.home);

module.exports = router;
