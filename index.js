const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRouter = require('./routes/user.routes');
const User = require('./models/User.model');

const taskRouter = require('./routes/task.routes');

const app = express();

app.use(cookieParser())
app.use(express.json());

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

mongoose.connect(process.env.STRING_CONNECTION)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
