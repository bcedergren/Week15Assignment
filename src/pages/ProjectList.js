import React, { useState, useEffect } from "react";
import Project from "../components/Project";
import {
  createProject,
  getAllProjects,
  deleteProject,
} from "../api/ProjectApi";
import ProjectForm from "../components/ProjectForm";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);

  // Fetch the list of projects from the JSON Server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  const onAddProject = (newProject) => {
    const projectToAdd = {
      name: newProject.name,
      description: newProject.description,
      tasks: [],
    };

    createProject(projectToAdd)
      .then((response) => {
        setProjects([...projects, response]);
        setShowAddProject(false);
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  };

  const handleOnDelete = (projectId) => {
    const updatedProjectList = projects.filter(
      (project) => project.id !== projectId
    );
    deleteProject(projectId)
      .then(() => {
        setProjects(updatedProjectList);
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  return (
    <div className='container'>
      <h1 className='display-4'>Project List</h1>
      <button
        className='btn btn-primary mb-3'
        onClick={() => setShowAddProject(!showAddProject)}
      >
        Add Project
      </button>
      {showAddProject && (
        <ProjectForm
          onAddProject={onAddProject}
          onHideAddProject={() => setShowAddProject(!showAddProject)}
        />
      )}
      <ul className='list-group'>
        {projects.map((project) => (
          <li key={project.id} className='list-group-item'>
            <Project
              project={project}
              onDelete={() => handleOnDelete(project.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
