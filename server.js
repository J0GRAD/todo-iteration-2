// ===============================
// NOTED - SERVER.JS
// ===============================
// Main entry point for NOTED server. Sets up Express server, connects to database, 
// configures middleware, and defines routes for tasks, users, and authentication.
// NOTE: request travels from middleware in the order it is defined in app.use()

// ============================
// IMPORTS
// ============================

require("dotenv").config();
require("./config/passport.js");
const express         = require("express");
const session         = require("express-session");
const MongoStore      = require("connect-mongo");
const connectDatabase = require("./config/db.js");
const errorHandlers   = require("./middleware/error-handlers.js");
const passport        = require("passport");
const flash           = require("express-flash");

// ============================
// SET UP + CONFIGURATION
// ============================

// CONFIGURE EXPRESS SERVER AND UNPACK METHODS
const app   = express(); 
const PORT  = process.env.PORT || 3000;
app.use(express.json()); // reads json and attaches .json() object to req
app.use(express.urlencoded({ extended: true }));

// SESSION AND AUTHENTICATION
app.use(session({
    secret:            process.env.SESSION_SECRET || "default-secret",
    resave:            false, 
    saveUninitialized: false,
    store:             MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        httpOnly: true,
        sameSite: "lax", 
        maxAge: 1000 * 60 * 60 * 24, 
        secure: false
    }
}));
app.use(passport.initialize()); // attaches login() and logout() to user
app.use(passport.session()); // deserializes all future requests from browser with session cookie
app.use(flash()); // 

// VIEWS
app.set("view engine", "ejs"); // sets view engine to ejs
app.set("views", "/src/views");

// STATIC ASSETS
app.use(express.static("public")); // sets static directory to "/public"

// ============================
// ROUTING
// ============================

// IMPORTS
const taskRoutes      = require("./src/routes/tasks.js");
const noteRoutes      = require("./src/routes/notes.js");
const eventRoutes     = require("./src/routes/events.js");
const userRoutes      = require("./src/routes/users.js");
const authRoutes      = require("./src/routes/auth.js");
const dashboardRoutes = require("./src/routes/dashboard.js");

// USE
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/notes", noteRoutes);
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(errorHandlers.notFound); // 404 no route error

// == IF ERROR 
// GLOBAL ERROR HANDLER
app.use(errorHandlers.global);

// ============================
// START SERVER 
// ============================
const startServer = async () => {
    try {
        await connectDatabase(); 
        app.listen(PORT, () => {
            console.log(`=== SERVER IS RUNNING ON PORT ${PORT}`);
        })
    } catch (error) {
        console.log(`Error stack: ${error.stack}`);
        console.log("========");
        console.error("Error starting server:", error); 
        process.exit(1); 
    }
}
startServer(); // starts server in correct order