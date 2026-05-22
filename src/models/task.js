// ===============================
// models/task.js
// ===============================
// Handles task schema definition and model export

// ===============================
// IMPORTS
// ===============================
const mongoose = require("mongoose");

// ===============================
// TASK SCHEMA
// ===============================
// Task model requires:
//  - user: objectid (corresponding user id)
//  - name: String
//  - subject: String (optional)
//  - description: String (optional)
//  - color: String (hex string),
//  - dueDate: String (optional)
//  - recurrence: enum[String] (daily, monthly, etc.)
//  - recurrenceEndDate: String (determines date it closes)
//  - completed: Boolean (default false)

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,
        lowercase: true, 
        required: true,
        trim: true,
        maxLength: 200
    },
    subject: {
        type: String, 
        required: false,
        index: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        maxLength: 500
    },
    color: {
        type: String,
        required: false,
        default: "#FFFFFF"
    },
    completed: {
        type: Boolean,
        required: false,
        default: false 
    },
    dueDate: {
        type: String,
        required: false
    },
    recurrence: {
        type: String,
        required: false,
        enum: ["none", "daily", "weekly", "monthly"],
        default: "none"
    },
    recurrenceEndDate: {
        type: String, 
        required: false
    }
}, { timestamps: true });

// ===============================
// TASK SCHEMA TO MODEL
// ===============================
const Task = mongoose.model("Task", taskSchema);

// ===============================
// EXPORTS
// ===============================
module.exports = Task;