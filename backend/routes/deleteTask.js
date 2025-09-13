const { tasks } = require('./tasksData');

// Delete a task by id
module.exports = (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({ error: 'Invalid task ID.' });
    return;
  }
  const idx = tasks.findIndex(task => task.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Task not found.' });
    return;
  }
  tasks.splice(idx, 1);
  res.status(204).end();
};
