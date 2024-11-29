import Task from '../models/Task.model.js';

export async function createTask(req, res) {
  try {
    const taskData = {
      ...req.body,
      user: req.user._id
    }
    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateTask(req, res) {
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
}

export async function deleteTask(req, res) {
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
}

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({user: req.user._id});
    res.status(200).json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}