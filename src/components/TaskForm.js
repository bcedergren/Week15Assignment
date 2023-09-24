import React, { useState } from "react";

export default function TaskForm({ onHandleSubmit }) {
  const [newTask, setNewTask] = useState({ title: "", completed: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onHandleSubmit(newTask);
    setNewTask({ title: "", completed: false }); // Clear the input fields
  };

  return (
    <form onSubmit={handleSubmit} className='mt-3'>
      <div>
        <label htmlFor='title' className='form=label h6'>
          Title:
        </label>
        <input
          type='text'
          id='title'
          name='title'
          className='m-4'
          value={newTask.title}
          onChange={handleChange}
          required
        />
        <button type='submit' className='btn btn-primary'>
          Add Task
        </button>
      </div>
    </form>
  );
}
