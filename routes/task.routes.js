const { createTask, updateTask, deleteTask, getTasks } = require('../controllers/task.controller');
const taskRouter = require('express').Router();
const { userAuth } = require('../middleware/userAuth.middleware');

taskRouter.post('/create', userAuth, createTask);
taskRouter.put('/update/:id', userAuth, updateTask);
taskRouter.delete('/delete/:id', userAuth, deleteTask);
taskRouter.get('/', userAuth, getTasks);

module.exports = taskRouter;