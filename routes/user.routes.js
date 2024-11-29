const { register, login } = require('../controllers/user.controller');
const userRouter = require('express').Router();

userRouter.post('/register', register);
userRouter.get('/login/:id', login);

module.exports = userRouter;