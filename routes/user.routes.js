import { register, login } from '../controllers/user.controller.js';
import express from 'express';
import { userAuth } from '../middleware/userAuth.middleware.js';
import { check } from 'express-validator';

const userRouter = express.Router();

userRouter.post('/register', [
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('user').not().isEmpty().withMessage('Username is required'),
  check('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 6 characters long')
  .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
], register);
userRouter.post('/login/', [
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password').not().isEmpty().withMessage('Password is required')
], login);
userRouter.post('/', userAuth);

export default userRouter;