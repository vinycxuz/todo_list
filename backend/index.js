
import express, { json } from 'express';
import cors from 'cors';
import { createClient } from 'redis';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import userRouter from './routes/user.routes.js';
import User from './models/User.model.js';

import taskRouter from './routes/task.routes.js';

import { connectDB } from './database/mongoClient.js';
import { connectRedis } from './database/redisClient.js';

const app = express();

const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser())
app.use(json());
dotenv.config();
app.use(cors({
  origin: 'https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'path/to/react/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'path/to/react/dist', 'index.html'));
});

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

connectDB();
connectRedis();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});