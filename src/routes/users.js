// ===============================
// routes/user.js
// ===============================
// Contains all routing logic relating to the user object, including updating and deleting the user

// ===============================
// IMPORTS
// ===============================

const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.js");
const ensureAuth = require("../middleware/ensure-auth.js");

// ===============================
// ROUTES
// ===============================

router.patch  ("/:id", ensureAuth, userController.updateUserById);
router.delete ("/:id", ensureAuth, userController.deleteUserById);
