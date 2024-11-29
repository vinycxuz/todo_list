const { register, login } = require('../controllers/user.controller');
const userRouter = require('express').Router();
const { userAuth } = require('../middleware/userAuth.middleware');

userRouter.post('/register', register);
userRouter.post('/login/', login);
userRouter.post('/', userAuth);

module.exports = userRouter;