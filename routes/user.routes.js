import { register, login } from '../controllers/user.controller.js';
import express from 'express';
import { userAuth } from '../middleware/userAuth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login/', login);
userRouter.post('/', userAuth);

export default userRouter;