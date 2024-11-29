const User = require('../models/User.model');

module.exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);

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