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

router.patch  ("/profile",     ensureAuth, userController.updateProfile);
router.patch  ("/email",       ensureAuth, userController.updateEmail);
router.patch  ("/preferences", ensureAuth, userController.updatePreferences);
router.patch  ("/password",    ensureAuth, userController.updatePassword);
router.delete ("/delete",      ensureAuth, userController.deleteUserById);

module.exports = router;