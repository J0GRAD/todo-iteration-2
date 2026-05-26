// ===============================
// models/note.js
// ===============================
// Contains note schema, relevant methods, and exports model 

// ===============================
// IMPORTS
// ===============================
const mongoose = require("mongoose");

// ===============================
// EVENT SCHEMA
// ===============================
// EVENT requires:
//  - userId: ObjectId (corresponding user id)
//  - calendarId: ObjectId (stored in calendar)
//  - taskId: ObjectId (connects event to task)
//  - title: String 
//  - subject: String
//  - description: String (optional)
//      - should be open to markdown,
//  - date: String
//  - color: String (hex string)

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        index: true
    },
    calendarId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Calendar",
        required: true, 
        index: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: false,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    subject: {
        type: String, 
        required: false,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: false,
        maxLength: 500
    },
    color: {
        type: String,
        default: "#FFFFFF"
    },
    date: {
        type: String,
        required: true
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
// CONVERT SCHEMA TO MODEL
// ===============================
const Event = mongoose.model("Event", eventSchema);

// ===============================
// EXPORTS
// ===============================
module.exports = Event;

