const express = require("express");
const router = express.Router();//creates a new router object
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router; //exposes the router to be used in other files
