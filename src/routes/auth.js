// ===============================
// routes/auth.js
// ===============================
// Contains all routing logic relating to register, login, and logout

// ===============================
// IMPORTS
// ===============================

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

// ===============================
// ROUTES
// ===============================

router.get ("/register", authController.renderRegister);
router.get ("/login",    authController.renderLogin);
router.post("/register", authController.registerUser);
router.post("/login",    authController.loginUser);
router.post("/logout",   authController.logoutUser);