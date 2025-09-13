const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRouter);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
