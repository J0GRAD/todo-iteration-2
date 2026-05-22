// ===============================
// controllers/tasks.js
// ===============================
// Contains all business logic functionality for relevant routes relating to tasks.js

// ===============================
// IMPORTS
// ===============================
const Task = require("../models/task.js");
const utils = require("../utils/controllerFuncs.js");

// ===============================
// FUNCTIONS
// ===============================

// CREATE
exports.createTask = async (req, res, next) => {
    try {
        const allowedFields = [
            "title", 
            "subject", 
            "description", 
            "color", 
            "dueDate", 
            "recurrence", 
            "recurrenceEndDate"
        ];
        const requiredFields = ["title"];

        const baseFields = { userId: req.user._id };
        const { resultFields, missing } = utils.checkCreateFields(
            req, allowedFields, requiredFields, baseFields
        );

        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(", ")}`,
                missing: missing
            });
        }
        const newTask = await Task.create(resultFields);

        res.status(201).json({
            message: "Task created successfully.",
            newTask
        });
    } catch (error) {
        next(error);
    }
}

// UPDATE BY ID
exports.updateById = async (req, res, next) => {
    try {
        const allowedFields = [
            "title", 
            "subject", 
            "description", 
            "color", 
            "completed", 
            "dueDate", 
            "recurrence", 
            "recurrenceEndDate"
        ];

        const updates = utils.checkPatchFields(req, allowedFields);
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
        
        res.status(200).json({ 
            message: "Task updated successfully.", 
            updatedTask 
        });
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

        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        next(error);
    }
}


// TO BE ADDED: DELETIONS VIA DATE, DELETE ALL, DELETIONS VIA SUBJECT