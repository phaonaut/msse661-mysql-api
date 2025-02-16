import express from 'express';
import { login, registerUser, logOut, token  } from '../controller/authcontroller.js';

const authRoutes = express.Router();

/**
 * Routes for authentication
 */
authRoutes.post('/register', registerUser);
authRoutes.post('/login', login);
authRoutes.post('/token', token);
authRoutes.post('/logout', logOut);

export default authRoutes;
