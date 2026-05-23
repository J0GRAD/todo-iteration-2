// ===============================
// controllers/users.js
// ===============================
// Contains all business logic functionality for relevant routes relating to users.js

// ===============================
// IMPORTS
// ===============================
const User = require("../models/user.js");
const calendarController = require("calendars.js");
const utils = require("../utils/controllerFuncs.js");

// ===============================
// FUNCTIONS
// ===============================

// PATCH
exports.updateUserById = async (req, res, next) => {
    try {
        const allowedFields = [
            "username",
            "email", 
            "password"
        ];

        const updates = utils.checkPatchFields(req, allowedFields);
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided."
            });
        }

        const userId = req.user._id;
        const updatedUser = await Task.findOneAndUpdate(
            { userId },
            { $set: updates },
            { new: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "User updated successfully.",
            updatedUser
        });
    } catch (error) {
        next(error);
    }
}

// DELETE
exports.deleteUserByid = async (req, res, next) => {
    try{
        deletedUser = User.findOneAndDelete(
            { userId: req.user._id }
        );    
        
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found." });
        }

        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        next(error);
    }
}