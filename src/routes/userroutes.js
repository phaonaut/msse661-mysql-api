import express from 'express';
import usercontroller from '../controller/usercontroller.js';
import tokenVerificationCheck from '../middleware/auth.middleware.js';

const userRoutes = express.Router();

/**
 * Express routes for the app
 */

/**
 * Routes for users
 */
userRoutes.get('/me', tokenVerificationCheck, usercontroller.getMe);

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
userRoutes.put('/me', tokenVerificationCheck, usercontroller.updateUser);

export default userRoutes;
