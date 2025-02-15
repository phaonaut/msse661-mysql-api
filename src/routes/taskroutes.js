import express from 'express';
import tasksController from '../controller/taskscontroller.js';

const tasksRoutes = express.Router();

tasksRoutes.get('/', tasksController.getAllTasks);

tasksRoutes.get('/:id', tasksController.getTaskById);

tasksRoutes.post('/', tasksController.createTask);

tasksRoutes.put('/:id', tasksController.updateTask);

tasksRoutes.delete('/:id', tasksController.deleteTask);

export default tasksRoutes;