// ===============================
// controllers/events.js
// ===============================
// Contains all business logic functionality for relevant routes relating to events.js

// ===============================
// IMPORTS
// ===============================
const utils = require("../services/dashboard.js");

// ===============================
// FUNCTIONS
// ===============================

// RENDER DASHBOARD
exports.renderDashboardNotes = async (req, res, next) => {
    try {
        const { userId, events, tasks, notes } = 
            await utils.getDashboardData(req);
        
        res.render("dashboard.ejs", { 
            userId,  
            notes,
            tasks 
        });
    } catch (error) {
        next(error);
    }
}

// RENDER CALENDAR
exports.renderDashboardCalendar = async (req, res, next) => {
    try {
        const { userId, events, tasks, notes } = 
            await utils.getDashboardData(req);

        res.render("calendar.ejs", {
            userId, 
            events,
            tasks
        });
    } catch (error) {
        next(error);
    }
}

// RENDER SETTINGS
exports.renderSettings = async (req, res, next) => {
    const userId = req.user._id;

    res.render("settings.ejs", { userId });
}

// TBA RENDER ANALYTICS
// exports.rendarAnalytics = async(req, res, next) => {
//     try {
//         const { userId, events, tasks, notes } =
//             await utils.getDashboardData(req);

//         const { analytics } = 
//             await utils.getAnalyticsInfo(userId);

//         res,render("analytics.ejs", {
//             userId, 
//             analytics, 
//             tasks
//         });
//     } catch (error) {
//         next(error); 
//     }
// }