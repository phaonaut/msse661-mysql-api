const controller = require('../controller/controller.js');
const express = require('express');

const routes = express.Router();

/**
 * Express routes for the app
 */

/**
 * Routes for users
 */
routes
    .get('/', controller.getUsers)
    .post('/', controller.addUser);

/**
 * Routes for user by identifier
 */
routes
    .get('/:id', controller.getUserById)
    // .put('/:id', controller.updateUser) // TODO Add support later
    .delete('/:id', controller.deleteUser);

module.exports = routes;
