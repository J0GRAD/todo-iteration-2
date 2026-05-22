// ===============================
// helpers/controllerFuncs.js
// ===============================
// Contains functions to assist with /controllers.

// CHECK CREATE FIELDS
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

    return { updates };
}



    