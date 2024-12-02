import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';

import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import { connectDB } from './database/mongoClient.js';
import { connectRedis } from './database/redisClient.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cookieParser());
app.use(json());
app.use(cors());

app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
});

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

async function startServer() {
  await connectDB();
  await connectRedis();

  app.get('/', (req, res) => {
    res.send('working');
  })

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();