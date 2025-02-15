import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';

import authRoutes from './routes/authroutes.js';
import userRoutes from './routes/userroutes.js';
import tasksRoutes from './routes/taskroutes.js';
import * as errors from './middleware/errors.js';

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

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRoutes);

// Handle 404 errors
app.use(errors.NotFound);

// Handle 500 errors
app.use(errors.GeneralError);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});