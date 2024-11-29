const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const { secretToken } = require('../utils/secretToken');

module.exports.register = async (req, res) => {
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
};

module.exports.login = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};