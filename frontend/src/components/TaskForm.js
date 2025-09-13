import React, { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

const initialState = {
  title: '',
  description: '',
  priority: 'medium',
};

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'medium',
      });
    } else {
      setForm(initialState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({ ...form });
    if (!editingTask) setForm(initialState);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div className="form-actions">
        <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
        {editingTask && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm;
