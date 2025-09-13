const { tasks } = require('./tasksData');

// Update a task
module.exports = (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid task ID.' });
  const { title, description, completed, priority } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found.' });
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) return res.status(400).json({ error: 'Title must be a non-empty string.' });
    task.title = title.trim();
  }
  if (description !== undefined) {
    if (typeof description !== 'string') return res.status(400).json({ error: 'Description must be a string.' });
    task.description = description.trim();
  }
  if (completed !== undefined) {
    if (typeof completed !== 'boolean') return res.status(400).json({ error: 'Completed must be a boolean.' });
    task.completed = completed;
  }
  if (priority !== undefined) {
    if (!['low','medium','high'].includes(priority)) return res.status(400).json({ error: 'Priority must be one of: low, medium, high.' });
    task.priority = priority;
  }
  res.json(task);
};
