const { createTask, updateTask, deleteTask, getTasks } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.post('/create', createTask);
taskRouter.put('/update/:id', updateTask);
taskRouter.delete('/delete/:id', deleteTask);
taskRouter.get('/', getTasks);

module.exports = taskRouter;