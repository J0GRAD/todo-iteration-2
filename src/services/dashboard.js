// ===============================
// services/dashboard.js
// ===============================
// Contains all helper functions helping handle business logic

// ===============================
// IMPORTS
// ===============================

const Event = require("../models/event.js");
const Task = require("../models/task.js");
const Note = require("../models/note.js");

// ===============================
// FUNCTIONS
// ===============================

// GATHER DASHBOARD DATA
exports.getDashboardData = async (
    req
) => {
    try {
        const userId = req.user._id;
        const calendarId = req.user.calendarId;

        const [events, tasks, notes] = await Promise.all([
            Event.find({ calendarId }),
            Task.find({ userId }),
            Note.find({ userId })
        ]);

        return { userId, events, tasks, notes };
    } catch (error) {
        throw error; 
    }
}

// TBA GET ANALYTICS INFO
