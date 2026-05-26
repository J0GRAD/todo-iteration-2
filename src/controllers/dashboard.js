// ===============================
// controllers/events.js
// ===============================
// Contains all business logic functionality for relevant routes relating to events.js

// ===============================
// IMPORTS
// ===============================
const utils = require("../utils/controllerFuncs.js");

// ===============================
// FUNCTIONS
// ===============================

// RENDER
exports.renderDashboard = async (req, res, next) => {
    try {
        const { userId, events, tasks, notes } = 
            await utils.getDashboardData(req);
        
        res.render("dashboard.ejs", { 
            userId, 
            events, 
            tasks, 
            notes 
        });
    } catch (error) {
        next(error);
    }
}