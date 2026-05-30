// ===============================
// helpers/controllerFuncs.js
// ===============================
// Contains functions to assist with /controllers.

const Event = require("../models/event.js");
const Task = require("../models/task.js");
const Note = require("../models/note.js");

// CHECK CREATE FIELDS
// note: if all fields are required, set allowedFields and requiredFields to point to the same array
exports.checkCreateFields = (
    req, allowedFields, requiredFields, baseFields
) => {
    const resultFields = { ...baseFields };
    const missing = [];

    for (const key of allowedFields) {
        const value = req.body[key];
        
        if (value !== undefined) {
            resultFields[key] = value;
        } else if (requiredFields.includes(key)) {
            missing.push(key);
        }
    }

    return { resultFields, missing };
}

// CHECK PATCH FIELDS
exports.checkPatchFields = (
    req, allowedFields
) => {
    const updates = {};
    
    for (const key of allowedFields) {
        const value = req.body[key];
        
        if (value !== undefined) {
            updates[key] = value;
        }
    }

    return updates;
}

// UPDATE USER FIELDS
exports.patchUpdate = async (
    req, model, allowedFields, filter
) => {
    const updates = exports.checkPatchFields(req, allowedFields);
    if (Object.keys(updates).length === 0) return { empty: true };

    const updatedUser = await model.findOneAndUpdate(
        filter,
        { $set: updates },
        { new: true }
    );
    if (!updatedUser) return { empty: true };

    return { empty: false };
}