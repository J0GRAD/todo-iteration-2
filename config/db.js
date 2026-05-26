// ===============================
// config/db.js
// ===============================
// Configures database, establishes mongoose connection and exports

// ===============================
// IMPORT MONGOOSE + process.env
// ===============================

require("dotenv").config();
const mongoose = require("mongoose"); 

// ===============================
// CONNECT TO DATABASE FUNCTION
// ===============================
const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to database: ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

// ===============================
// EXPORT FOR SERVER USE
// ===============================
module.exports = connectDatabase;