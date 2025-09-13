import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
// import './App.css'; // Uncomment if you have global styles

const API_URL = 'http://localhost:4000/api/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      // Handle error
    }
    setLoading(false);
  };

  const handleAdd = async (task) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  const handleUpdate = async (id, task) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    setEditingId(null);
    // Don't reset carousel index after edit
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskForm
        onSubmit={handleAdd}
      />
      <TaskFilter filter={filter} setFilter={setFilter} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          editingId={editingId}
          setEditingId={setEditingId}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onToggle={handleToggle}
          carouselIndex={carouselIndex}
          setCarouselIndex={setCarouselIndex}
        />
      )}
    </div>
  );
};

export default App;
