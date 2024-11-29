const Task = require('../models/Task.model');

module.exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      ...req.body,
      updated_date: Date.now()
    }
    const task = await Task.findByIdAndUpdate(id, updatedData, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updateTask = await Task.findById(id);
    res.status(200).json(updateTask);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};