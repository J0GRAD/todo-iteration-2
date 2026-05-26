// ===============================
// routes/tasks.js
// ===============================
// Contains all routing logic relating to tasks

// ===============================
// IMPORTS
// ===============================

const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.js");
const ensureAuth = require("../middleware/ensure-auth.js");

// ===============================
// ROUTES
// ===============================

router.post("/", ensureAuth, tasksController.createTask);
router.patch("/:id", ensureAuth, tasksController.updateById);
router.delete("/:id", ensureAuth, tasksController.deleteById);