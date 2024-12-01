import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { createClient } from 'redis';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import userRouter from './routes/user.routes.js';
import User from './models/User.model.js';

import taskRouter from './routes/task.routes.js';

const app = express();

app.use(cookieParser())
app.use(json());
dotenv.config();

app.get('/', (req, res) => {
  res.send('First Server Test');
});

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateUser = await User.findById(id);
    res.status(200).json(updateUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/

connect(process.env.STRING_CONNECTION)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
})
client.on('error', err => console.log('Redis Client Error', err))
client.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.log(err);
  });

  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
