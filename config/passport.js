// ===============================
// config/passport.js
// ===============================
// Configures passport, sets strategy, defines serialize and deserialization

// ===============================
// IMPORTS
// ===============================
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../src/models/user.js");

// ===============================
// CONFIGURATION
// ===============================
// LOCAL STRATEGY
passport.use(new LocalStrategy (
    { usernameField: "identifier" },
    async (identifier, password, done) => {
    try {
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        }); // find user by email or name
        if (!user) return done(null, false, { message: "Incorrect username!"});
        
        // compare password using comparison function in node.js
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return done(null, false, { message: "Incorrect password!"});
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// ===============================
// SERIALIZE + DESERIALIZE
// ===============================
// SERIALIZE USER
passport.serializeUser((user, done) => {
    done(null, user._id); // only store id in session
})

// ===============================
// DESERIALIZE USER
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).select("-password");
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// ===============================
// EXPORTS
// ===============================
module.exports = passport
