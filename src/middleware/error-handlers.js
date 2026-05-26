// ===============================
// middleware/error-handlers.js
// ===============================
// Contains all error handlers used in server.js 

// 404
exports.notFound = (req, res) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    error.status = 404;
    next(error); // moves to global
}

// GLOBAL
exports.global = (error, req, res, next) => {
    console.log(error.stack); 

    res.status(error.status || 500).json({
        success: false, 
        message: error.message || "An unexpected error occured"
    });
}

    