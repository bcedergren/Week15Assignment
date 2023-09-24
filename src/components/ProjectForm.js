import React, { useState } from "react";

export default function ProjectForm({ onAddProject, onHideAddProject }) {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject(newProject);
    // Clear the input fields after adding the project
    setNewProject({ name: "", description: "" });
  };

  // Function to hide the Add Project form
  const hideForm = () => {
    setNewProject({ name: "", description: "" });
    onHideAddProject();
  };

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h2 className='card-title'>Add Project</h2>
        <button
          type='button'
          className='btn-close'
          aria-label='Close'
          onClick={hideForm}
        ></button>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name:
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='form-control'
              value={newProject.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description:
            </label>
            <textarea
              id='description'
              name='description'
              className='form-control'
              value={newProject.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
