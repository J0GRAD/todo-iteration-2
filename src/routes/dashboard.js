// ===============================
// routes/dashboard.js
// ===============================
// Contains dashboard rendering logic

// Dashboard must return:
//  - User info (not password)
//  - Tasks
//  - Notes
//  - Events
//  - Calendar

// ===============================
// IMPORTS
// ===============================

const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.js");
const ensureAuth = require("../middleware/ensure-auth.js");

// ===============================
// ROUTES
// ===============================

// RENDER DASHBOARD
router.get("/", ensureAuth, dashboardController.renderDashboard);


