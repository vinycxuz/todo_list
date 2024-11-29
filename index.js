const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User.model');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('First Server Test');
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);

    res.status(201).json(user);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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
