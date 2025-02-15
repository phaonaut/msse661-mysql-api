import express from 'express';
import { login, registerUser } from '../controller/authcontroller.js';

const authRoutes = express.Router();

/**
 * Routes for authentication
 */
authRoutes.post('/register', registerUser);
authRoutes.post('/login', login);

export default authRoutes;
