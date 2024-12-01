import User from '../models/User.model.js';
import dotenv from 'dotenv';
import pkg from 'jsonwebtoken';
import redisClient from '../database/redisClient.js';

const { verify } = pkg;
dotenv.config();

export async function userAuth(req, res, next) {
  const token = req.cookies.secretToken;
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const cachedToken = await redisClient.get(data.id);
    if (token !== cachedToken) {
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
}