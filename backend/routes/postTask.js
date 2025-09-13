const { tasks, nextId } = require('./tasksData');

// Add a new task
module.exports = (req, res) => {
  const { title, description, priority } = req.body;
  const ok = title && typeof title === 'string' && ['low','medium','high'].includes(priority);
  if (!ok) {
    res.status(400).json({ error: 'Title (string) and valid priority required.' });
    return;
  }
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: typeof description === 'string' ? description.trim() : '',
    completed: false,
    createdAt: new Date(),
    priority
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};
