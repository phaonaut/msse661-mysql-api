const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const errors = require('./middleware/errors');


const app = express();
const port = process.env.PORT || 3000;
const logLevel  = process.env.LOG_LEVEL || 'dev';


// Middelware for logging
app.use(logger(logLevel));

// Middleware for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Routes
 */


// Test route
app.use('/test', (req, res) => {
    res.send('Hello World');
});

// Handles routes for sketchboxx /api/user
app.use('/api/user', routes);

// Handle 404 errors
app.use(errors.NotFound);

// Handle 500 errors
app.use(errors.GeneralError);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});