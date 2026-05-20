// ===============================
// models/note.js
// ===============================
// Contains note schema, relevant methods, and exports model 

// ===============================
// IMPORTS
// ===============================
const mongoose = require("mongoose");

// ===============================
// NOTE SCHEMA
// ===============================
// Note requires:
//  - user: ObjectId (corresponding user id)
//  - name: String
//  - subject: String (o)
//  - body: String (optional)
//      - should be open to markdown

const calendarSchema = new mongoose.Schema({
    user: {
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

