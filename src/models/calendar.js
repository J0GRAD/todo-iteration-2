// ===============================
// models/calendar.js
// ===============================
// Contains calendar schema, relevant methods, and exports model 

// ===============================
// IMPORTS
// ===============================
const mongoose = require("mongoose");

// ===============================
// CALENDAR SCHEMA
// ===============================
// Calendar requires:
//  - userId: ObjectId (corresponding user id)

const calendarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        index: true
    }
}, { timestamps: true });

// ===============================
// CONVERT SCHEMA TO MODEL
// ===============================
const Calendar = mongoose.model("Calendar", calendarSchema);

// ===============================
// EXPORTS
// ===============================
module.exports = Calendar;

