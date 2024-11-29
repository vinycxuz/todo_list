const { createTask } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.post('/create', createTask);

module.exports = taskRouter;