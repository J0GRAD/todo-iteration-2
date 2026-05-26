// ===============================
// helpers/controllerFuncs.js
// ===============================
// Contains functions to assist with /controllers.

const Event = require("../models/event.js");
const Task = require("../models/task.js");
const Note = require("../models/note.js");

// CHECK CREATE FIELDS
// note: if all fields are required, set allowedFields and requiredFields to point to the same array
exports.checkCreateFields = (
    req, allowedFields, requiredFields, baseFields
) => {
    const resultFields = { ...baseFields };
    const missing = [];

    for (const key of allowedFields) {
        const value = req.body[key];
        
        if (value !== undefined) {
            resultFields[key] = value;
        } else if (requiredFields.includes(key)) {
            missing.push(key);
        }
    }

    return { resultFields, missing };
}

// CHECK PATCH FIELDS
exports.checkPatchFields = (
    req, allowedFields
) => {
    const updates = {};
    
    for (const key of allowedFields) {
        const value = req.body[key];
        
        if (value !== undefined) {
            updates[key] = value;
        }
    }

    return updates;
}

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
        ])

        return { userId, events, tasks, notes };
    } catch (error) {
        throw error; 
    }
}


    