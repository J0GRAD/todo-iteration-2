// ===============================
// controllers/tasks.js
// ===============================
// Contains all business logic functionality for relevant routes relating to notes.js

// ===============================
// IMPORTS
// ===============================
const Note = require("../models/note.js");
const utils = require("../utils/controllerFunctions.js");

// ===============================
// FUNCTIONS
// ===============================

// CREATE
exports.createNote = async (req, res, next) => {
    try {
        const allowedFields = [
            "title", 
            "subject", 
            "body", 
            "color", 
            "pinned"
        ];
        const requiredFields = ["title"];


        const baseFields = { userId : req.user._id };
        const { resultFields, missing } = utils.checkCreateFields(
            req, allowedFields, requiredFields, baseFields
        );

        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(", ")}`,
                missing: missing
            });
        }

        const newNote = await Note.create(resultFields);

        res.status(201).json({
            message: "Note created successfully.",
            newNote
        });
    } catch (error) {
        next(error);
    }
}

// UPDATE BY ID
exports.updateById = async (req, res, next) => {
    try {
        const allowedFields = ["title", "subject", "description", "color", "completed", "dueDate", "recurrence", "recurrenceEndDate"];

        const updates = utils.checkPatchFields(
            req, allowedFields
        );
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
            return res.status(404).json({ message: "Note not found."});
        }
        
        res.status(200).json({ 
            message: "Note updated successfully.", 
            updatedNote 
        });
    } catch (error) {
        next(error);
    }
}

// DELETE BY ID
exports.deleteById = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const userId = req.user._id;
        
        const deletedNote = await Note.findOneAndDelete(
            { _id: noteId, userId }
        );
        
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found." });
        }

        res.status(200).json({ message: "Note deleted successfully." });
    } catch (error) {
        next(error);
    }
}


// TO BE ADDED: DELETIONS VIA DATE, DELETE ALL, DELETIONS VIA SUBJECT