import { createTask, updateTask, deleteTask, getTasks } from '../controllers/task.controller.js';
import express from 'express';
import { userAuth } from '../middleware/userAuth.middleware.js';

const taskRouter = express.Router();

taskRouter.post('/create', userAuth, createTask);
taskRouter.put('/update/:id', userAuth, updateTask);
taskRouter.delete('/delete/:id', userAuth, deleteTask);
taskRouter.get('/', userAuth, getTasks);

export default taskRouter;