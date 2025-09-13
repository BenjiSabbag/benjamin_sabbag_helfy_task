import React from 'react';
import '../styles/TaskFilter.css';

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="task-filter">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        className={filter === 'incomplete' ? 'active' : ''}
        onClick={() => setFilter('incomplete')}
      >
        Incomplete
      </button>
    </div>
  );
};

export default TaskFilter;
