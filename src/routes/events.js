// ===============================
// routes/events.js
// ===============================
// Contains all routing logic relating to events

// ===============================
// IMPORTS
// ===============================

const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events.js");
const ensureAuth = require("../middleware/ensure-auth.js");

// ===============================
// ROUTES
// ===============================

router.post("/", ensureAuth, eventsController.createEvent);
router.patch("/:id", ensureAuth, eventsController.updateById);
router.delete("/:id", ensureAuth, eventsController.deleteById);