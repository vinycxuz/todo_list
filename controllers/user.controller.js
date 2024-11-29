import User from '../models/User.model.js';
import { compare } from 'bcrypt';
import { secretToken } from '../utils/secretToken.js';

export async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    const userStatus = await User.findOne({ email });

    if (userStatus) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create(req.body);

    const createSecretToken = secretToken(user._id);
    res.cookie('secretToken', createSecretToken, {
      httpOnly: false,
      withCredentials: true
    });

    res.status(201).json(user);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'invalid user or password' });
    }
    const isMatch = await User.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'invalid user or password' });
    }

    const createSecretToken = secretToken(user._id);
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