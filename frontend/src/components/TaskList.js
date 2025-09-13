import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = ({ tasks, editingId, setEditingId, onUpdate, onDelete, onToggle, carouselIndex, setCarouselIndex }) => {
  const currentIndex = carouselIndex;


  // Only reset currentIndex to 0 if the number of tasks changes (e.g., after add/delete/filter)
  useEffect(() => {
    setCarouselIndex((prev) => {
      if (prev >= tasks.length) {
        return 0;
      }
      return prev;
    });
  }, [tasks.length, setCarouselIndex]);


  if (!tasks.length) {
    return <div className="task-list-empty">No tasks to display.</div>;
  }

  // Prevent out-of-bounds access
  const safeIndex = currentIndex < tasks.length ? currentIndex : 0;

  const prevTask = () => {
    setCarouselIndex((prev) => (prev - 1 + tasks.length) % tasks.length);
  };
  const nextTask = () => {
    setCarouselIndex((prev) => (prev + 1) % tasks.length);
  };

  return (
    <div className="task-list-carousel">
      <div className="carousel-row">
        <button className="carousel-arrow" onClick={prevTask} aria-label="Previous Task">&#8592;</button>
        <TaskItem
          key={tasks[safeIndex].id}
          task={tasks[safeIndex]}
          isEditing={editingId === tasks[safeIndex].id}
          setEditingId={setEditingId}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
        <button className="carousel-arrow" onClick={nextTask} aria-label="Next Task">&#8594;</button>
      </div>
      <div className="carousel-indicator">
        {tasks.map((_, idx) => (
          <span
            key={idx}
            className={idx === currentIndex ? 'active' : ''}
          >
            •
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
