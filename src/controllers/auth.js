// ===============================
// controllers/auth.js
// ===============================
// Contains all business logic functionality for relevant routes relating to authentication
// and login

// ===============================
// IMPORTS
// ===============================
const Calendar = require("../models/calendar.js");
const User = require("../models/user.js");
const passport = require("passport"); 
const utils = require("../utils/controllerFuncs.js");

// ===============================
// FUNCTIONS
// ===============================

// REGISTER
// - create account
// - create calendar
// - log in user
// 
exports.register = async (req, res, next) => {
    try {
        const requiredFields = [
            "username",
            "email",
            "password"
        ];

        const { resultFields, missing } = utils.ensureAllFields(
            req, requiredFields
        );
        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing}`,
                missing
            });
        }

        const newUser = await User.create(resultFields);
        try {
            const newCalendar = await Calendar.create({ userId: newUser._id });
            newUser.calendarId = newCalendar._id;
            await newUser.save();
            
            req.login(newUser, (error) => {
                if (error) return next(error);
                res.redirect("/");
            });
        } catch (error) {
            await User.findByIdAndDelete(newUser._id);
            throw error;
        }
        
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            
            return res.status(400).json({
                message: `${field} already exists.` 
            });
        }
        next(error); 
    }
}

// LOG IN
exports.loginUser = (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) return next(error);
        if (!user) {
            return res.status(401).json({
                message: info.message
            });
        }

        req.login(user, (error) => {
            if (error) return next(error); 

            res.redirect("/"); 
        });
    })(req, res, next);
}

// LOGOUT
exports.logoutUser = (req, res, next) => {
    req.logout((error) => {
        if (error) return res.status(400).json({
            message: "Failed to log out user."
        });
        
        res.redirect("/login")
    });
}