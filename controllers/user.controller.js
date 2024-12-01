import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import { secretToken } from '../utils/secretToken.js';
import redisClient from '../database/redisClient.js';
import { validationResult } from 'express-validator';


export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, user, password } = req.body;
    const userStatus = await User.findOne({ email });

    if (userStatus) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create(req.body);

    const createSecretToken = secretToken(newUser._id);
    res.cookie('secretToken', createSecretToken, {
      httpOnly: false,
      withCredentials: true
    });

    res.status(201).json(newUser);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'invalid user or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'invalid user or password' });
    }

    const createSecretToken = secretToken(user._id);
    await redisClient.set(user._id.toString(), createSecretToken, { EX: 1800 });

    res.cookie('secretToken', createSecretToken, {
      httpOnly: true,
      withCredentials: true
    });
    res.status(200).json({user, message: 'Login success'});
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}