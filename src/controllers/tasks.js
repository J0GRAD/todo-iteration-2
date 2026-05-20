// ===============================
// controllers/tasks.js
// ===============================
// Contains all business logic functionality for relevant routes relating to tasks.js

// ===============================
// IMPORTS
// ===============================

const Task = require("../models/task.js");

// ===============================
// FUNCTIONS
// ===============================

getAllTasks = async (req, res, next) => {
    try {
        const tasks = Task.find({ id: req.user._id })
    }
}

// ===============================
// EXPORTS
// ===============================
