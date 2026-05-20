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
//  - title: String
//  - subject: String 
//  - body: String (optional)
//      - should be open to markdown
//  - color: String (hexstring)
//  - pinned: Boolean

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
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
    body: {
        type: String,
        required: false
    },
    color: {
        type: String,
        default: "#FFFFFF"
    },
    pinned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

// ===============================
// CONVERT SCHEMA TO MODEL
// ===============================
const Note = mongoose.model("Note", noteSchema);

// ===============================
// EXPORTS
// ===============================
module.exports = Note;

