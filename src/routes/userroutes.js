const express = require('express');
const usercontroller = require('../controller/usercontroller.js');
const verifyToken = require('../middleware/verifytoken.js');

const userRoutes = express.Router();

/**
 * Express routes for the app
 */

/**
 * Routes for users
 */
userRoutes.get('/me', usercontroller.getMe);

/**
 * Swagger Documentation for PUT /api/user/me
 * @swagger
 * /api/user/me:
 *  put:
 *    summary: Update user information
 *   description: Update user information
 *  headers:
 *    auth-token: { type: string, description: 'JWT token' }
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username: { type: string }
 *             email: { type: string }
 *             password: { type: string }
 *   responses:
 *     200: { description: 'User updated successfully.' }
 */
userRoutes.put('/me', verifyToken, usercontroller.updateUser);

module.exports = userRoutes;
