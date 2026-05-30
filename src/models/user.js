// ===============================
// models/user.js
// ===============================
// Contains user schema for mongoose, relevant methods, and exports

// ===============================
// IMPORTS
// ===============================
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

// ===============================
// USER SCHEMA
// ===============================
// User model requires: 
// - username: String
// - email: String (must be verified)
// - password: String (hashed, minimum length requirement)
// - calendarId: ObjectId (connects calendar + events to user)

const userSchema = new mongoose.Schema({
    calendarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calendar",
        required: false,
        index: true  
    },
    username: {
        type: String, 
        required: true, 
        lowercase: true,
        unique: true,
        trim: true
    }, 
    email: {
        type: String, 
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, "Password must be at least 8 characters!"]
    },
    visualMode: {
        type: String,
        enum: ["light", "dark"],
        trim: true,
        default: "dark"
    }
}, { timestamps: true });

// ===============================
// METHODS
// ===============================

// HASH BEFORE SAVING
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);  
        next()
    } catch (error) {
        next(error);
    }
});

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return false;
    }
}

// ===============================
// USER MODEL
// ===============================
// Converts schema to exportable model
const User = mongoose.model("User", userSchema);

// ===============================
// EXPORTS
// ===============================
module.exports = User; 

