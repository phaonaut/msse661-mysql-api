import express from 'express';
import tasksController from '../controller/taskscontroller.js';
import tokenVerificationCheck from '../middleware/auth.middleware.js';


const tasksRoutes = express.Router();

tasksRoutes.get('/', tokenVerificationCheck, tasksController.getAllTasks);

tasksRoutes.get('/:id', tokenVerificationCheck, tasksController.getTaskById);

tasksRoutes.post('/', tokenVerificationCheck, tasksController.createTask);

tasksRoutes.put('/:id', tokenVerificationCheck, tasksController.updateTask);

tasksRoutes.delete('/:id', tokenVerificationCheck, tasksController.deleteTask);

export default tasksRoutes;