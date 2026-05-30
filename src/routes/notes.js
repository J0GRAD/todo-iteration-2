// ===============================
// routes/notes.js
// ===============================
// Contains all routing logic relating to notes

// ===============================
// IMPORTS
// ===============================

const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes.js");
const ensureAuth = require("../middleware/ensure-auth.js");

// ===============================
// ROUTES
// ===============================

router.post  ("/",    ensureAuth, notesController.createNote);
router.patch ("/:id", ensureAuth, notesController.updateById);
router.delete("/:id", ensureAuth, notesController.deleteById);

module.exports = router;