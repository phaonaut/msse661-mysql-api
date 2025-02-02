exports.NotFound = (req, res, next) => {
    next({ status: 404, message: 'Route does not exist' });
};

exports.GeneralError = (err, req, res, next) => { 
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
};