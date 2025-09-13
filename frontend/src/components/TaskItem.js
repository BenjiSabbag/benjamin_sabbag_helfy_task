import React from 'react';
import TaskForm from './TaskForm';
import '../styles/TaskItem.css';

const TaskItem = ({ task, isEditing, setEditingId, onUpdate, onDelete, onToggle }) => {
  if (isEditing) {
    return (
      <div className={`task-item editing`}>
        <TaskForm
          editingTask={task}
          onSubmit={form => onUpdate(task.id, form)}
          onCancel={() => setEditingId(null)}
        />
      </div>
    );
  }
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}> 
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>
      <p>{task.description}</p>
      <div className="task-meta">
        <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={() => setEditingId(task.id)}>Edit</button>
        <button onClick={() => onDelete(task.id)} className="delete">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
