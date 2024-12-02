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
app.use(cors());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.use(express.static(path.join(__dirname, './frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist', 'index.html'));
});


async function startServer() {
  await connectDB();
  await connectRedis();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();