const { tasks } = require('./tasksData');
module.exports = (req, res) => {
  res.json(tasks);
};
