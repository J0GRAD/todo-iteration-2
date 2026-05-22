// ===============================
// controllers/tasks.js
// ===============================
// Contains all business logic functionality for relevant routes relating to notes.js

// ===============================
// IMPORTS
// ===============================
const Note = require("../models/note.js");

// ===============================
// FUNCTIONS
// ===============================

// CREATE
exports.createNote = async (req, res, next) => {
    try {
        const allowedFields = ["title", "subject", "body", "color", "pinned"];
        const requiredFields = ["title"];
        const missing = [];

        const userId = req.user._id;
        const fields = { userId };
        for (const key of allowedFields) {
            if (req.body[key] !== undefined) {
                fields[key] = req.body[key];
            } else if (requiredFields.includes(key)) {
                missing.push(key);
            }
        }
        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(", ")}`,
                missing: missing
            });
        }

        const newTask = await Task.create({
            ...fields
        });

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
}

// UPDATE BY ID
exports.updateById = async (req, res, next) => {
    try {
        const allowedFields = ["title", "subject", "description", "color", "completed", "dueDate", "recurrence", "recurrenceEndDate"];

        const updates = {};
        for (const key of allowedFields) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            } 
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update." 
            });
        }

        const taskId = req.params.id;
        const userId = req.user._id;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            { $set: updates },
            { new: true }
        )

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found."});
        }
        
        res.status(200).json({ message: "Task updated successfully!", updatedTask });
    } catch (error) {
        next(error);
    }
}

// DELETE BY ID
exports.deleteById = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;
        
        const deletedTask = await Task.findOneAndDelete(
            { _id: taskId, userId }
        );
        
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found." });
        }

        res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
        next(error);
    }
}


// TO BE ADDED: DELETIONS VIA DATE, DELETE ALL, DELETIONS VIA SUBJECT