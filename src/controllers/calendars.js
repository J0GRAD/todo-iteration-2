// ===============================
// controllers/tasks.js
// ===============================
// Contains all business logic functionality for relevant routes relating to tasks.js

// ===============================
// IMPORTS
// ===============================
const Calendar = require("../models/calendar.js");

// ===============================
// FUNCTIONS
// ===============================

// CREATE
exports.createCalendar = async (req, res, next) => {
    try {
        const newCalendar = await Calendar.create({ userId: req.user._id });

        res.status(201).json({
            message: "Calendar created successfully.",
            newCalendar
        });
    } catch (error) {
        next(error);
    }
}

// DELETE BY ID
exports.deleteCalendar = async (req, res, next) => {
    try {
        const calendarId = Calendar.findOne()
    } catch (error) {
        next(error);
    }
}


// TO BE ADDED: DELETIONS VIA DATE, DELETE ALL, DELETIONS VIA SUBJECT