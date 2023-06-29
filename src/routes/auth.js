const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/login", authController.signin);
router.get("/register", authController.signup);
router.get("/logout", authController.logout);
module.exports = router;
