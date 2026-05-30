// ===============================
// controllers/users.js
// ===============================
// Contains all business logic functionality for relevant routes relating to users.js

// ===============================
// IMPORTS
// ===============================
const User = require("../models/user.js");
const utils = require("../utils/controllerFuncs.js");
const bcrypt = require("bcrypt");

// ===============================
// FUNCTIONS
// ===============================

// PATCH
exports.updateProfile = async (req, res, next) => {
    try {
        const { empty } = await utils.patchUpdate(
            req, 
            User, 
            ["username"], 
            { _id: req.user._id }
        );
        if (empty) {
            return res.status(400).json({
                message: "An error occured."
            });
        }
        res.redirect("/dashboard");
    } catch (error) {
        next(error);
    }
}

exports.updatePreferences = async (req, res, next) => {
    try {
        const { empty } = await utils.patchUpdate(
            req, 
            User, 
            ["visualMode"], 
            { _id: req.user._id }
        );
        if (empty) {
            return res.status(400).json({
                message: "An error occured."
            });
        }
        res.redirect("/dashboard");
    } catch (error) {
        next(error); 
    }
}

exports.updateEmail = async (req, res, next) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({
                message: "Please enter an email."
            });
        }
        req.user.email = req.body.email;
        await req.user.save();
        
        res.redirect("/dashboard");
    } catch (error) {
        next(error);
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        const matches = await bcrypt.compare(
            req.body.password,
            req.user.password
        )
        if (!matches) {
            return res.status(400).json({
                message: "Incorrect password provided."
            });
        }
        req.user.password = req.body.newPassword;
        await req.user.save();

        res.redirect("/dashboard");
    } catch (error) {
        next(error);
    }
}

// DELETE
exports.deleteUserById = async (req, res, next) => {
    try{
        const deletedUser = await User.findOneAndDelete(
            { _id: req.user._id }
        );    
        if (!deletedUser) {
            res.redirect("/dashboard");
        }

        req.logout((error) => {
            if (error) return next(error);

            req.session.destroy((error) => {
                if (error) return next(error); 

                res.clearCookie("connect-sid");
                res.redirect("/login");
            });
        });
    } catch (error) {
        next(error);
    }
}