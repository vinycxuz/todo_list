const User = require('../models/User.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.userAuth = async (req, res, next) => {
  const token = req.cookies.secretToken;
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const user = await User.findById(data.id);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'Not authorized' });
    }
  });
};