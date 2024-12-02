import express, { json } from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import { connectDB } from './database/mongoClient.js';
import { connectRedis } from './database/redisClient.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(json());

app.use(cors({
  origin: 'https://todo-list-vinycxuz-902a28c21ca1.herokuapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.static(path.join(__dirname, './frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist', 'index.html'));
});

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

async function startServer() {
  await connectDB();
  await connectRedis();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();