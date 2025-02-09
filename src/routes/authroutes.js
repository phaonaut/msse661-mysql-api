const controller = require('../controller/authcontroller.js');
const express = require('express');

const authRoutes = express.Router();

/**
 * Routes for authentication
 */
authRoutes.post('/register', controller.registerUser);
authRoutes.post('/login', controller.login);

module.exports = authRoutes;
