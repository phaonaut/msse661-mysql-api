export default serverError => (res) => (err) => {
    console.log("!ServerError", err);
    res.status(500).json({
       error: {
          message: err.message || 'Internal Server Error',
       },
       message: 'An unexpected error occurred.'
    });  
};