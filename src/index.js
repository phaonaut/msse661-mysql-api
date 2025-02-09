const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes');
const errors = require('./middleware/errors');


const app = express();
const port = process.env.PORT || 3000;
const logLevel  = process.env.LOG_LEVEL || 'dev';


// Middelware for logging
app.use(logger(logLevel));

// Middleware for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


/**
 * Routes
 */


// Test route
app.use('/test', (req, res) => {
    res.send('Hello World');
});

// Handles routes for sketchboxx
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/sketch', routes); //TODO add sketch routes

// Handle 404 errors
app.use(errors.NotFound);

// Handle 500 errors
app.use(errors.GeneralError);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});