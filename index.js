import express, { json } from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import { connectDB } from './database/mongoClient.js';
import { connectRedis } from './database/redisClient.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(json());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

async function startServer() {
  await connectDB();
  await connectRedis();

  app.use(express.static(path.join(__dirname, 'path/to/react/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'path/to/react/dist', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();