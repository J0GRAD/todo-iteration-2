// ===============================
// controllers/tasks.js
// ===============================
// Contains all business logic functionality for relevant routes relating to tasks.js

// ===============================
// IMPORTS
// ===============================
const Event = require("../models/event.js");
const Calendar = require("../models/calendar.js");
const utils = require("../utils/controllerFuncs.js");

// ===============================
// FUNCTIONS
// ===============================

// CREATE
exports.createEvent = async (req, res, next) => {
    try {
        const allowedFields = [
            "calendarId", 
            "taskId", 
            "title", 
            "subject", 
            "description", 
            "date", 
            "color"
        ];
        const requiredFields = ["calendarId", "title"];

        const calendarId = Calendar.findOne({ user: req.user._id });
        const baseFields = { calendarId, userId: req.user._id };
        const { resultFields, missing } = utils.checkCreateFields(
            req, allowedFields, requiredFields, baseFields
        );

        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(", ")}`,
                missing: missing
            });
        }
        const newEvent = await Event.create(resultFields);

        res.status(201).json({
            message: "Event created successfully.",
            newEvent
        });
    } catch (error) {
        next(error);
    }
}

// UPDATE BY ID
exports.Event = async (req, res, next) => {
    try {
        const allowedFields = [
            "taskId",
            "title", 
            "subject", 
            "description", 
            "date", 
            "color"
        ];

        const updates = utils.checkPatchFields(req, allowedFields);
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update." 
            });
        }

        const eventId = req.params.id;
        const userId = req.user._id;
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, userId },
            { $set: updates },
            { new: true }
        )
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found."});
        }
        
        res.status(200).json({ 
            message: "Event updated successfully.", 
            updatedTask 
        });
    } catch (error) {
        next(error);
    }
}

// DELETE BY ID
exports.deleteById = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id;
        
        const deletedEvent = await Event.findOneAndDelete(
            { _id: eventId, userId }
        );
        
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
        next(error);
    }
}


// TO BE ADDED: DELETIONS VIA DATE, DELETE ALL, DELETIONS VIA SUBJECT