const { tasks } = require('./tasksData');

// Toggle task completion
module.exports = (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid task ID.' });
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found.' });
  task.completed = !task.completed;
  res.json(task);
};
