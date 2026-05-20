// ===============================
// middleware/ensure-auth.js
// ===============================
// Contains route protection middleware to ensure user is authorized and authenticated

// ===============================
// ensureAuth
// ===============================

const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/login");
}

// ===============================
// EXPORTS
// ===============================
module.exports = ensureAuth;
