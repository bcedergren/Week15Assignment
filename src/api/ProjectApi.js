// Define the base URL of the JSON Server
const apiUrl = "http://localhost:3001";

// Create a new project
export const createProject = async (project) => {
  try {
    // Format the project object
    const formattedProject = {
      name: project.name,
      description: project.description,
      tasks: project.tasks || [], // Initialize with an empty array
    };

    const response = await fetch(`${apiUrl}/projects`, {
      method: "POST",
      body: JSON.stringify(formattedProject),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create a new project: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Error creating project", error);
  }
};

// Read all projects
export const getAllProjects = async () => {
  try {
    const response = await fetch(`${apiUrl}/projects`);

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return await response.json(); // Parse the response JSON
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Read a single project by ID
export const getProjectById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/projects/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch project by ID");
    }

    return await response.json(); // Parse the response JSON
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Update an existing project by ID
export const updateProject = async (id, name, description) => {
  try {
    const response = await fetch(`${apiUrl}/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    });
    if (!response.ok) {
      throw new Error("Failed to update the project");
    }

    return await response.json(); // Parse the response JSON
  } catch (error) {
    console.error("Error updating projects:", error);
    throw error;
  }
};

// Delete a project by ID
export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/projects/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the project");
    }

    return true; // Deletion was successful
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const createTask = async (newTask, projectId) => {
  try {
    const projectResponse = await fetch(`${apiUrl}/projects/${projectId}`);
    if (!projectResponse.ok) {
      throw new Error("Failed to fetch project by ID");
    }

    const projectData = await projectResponse.json();
    projectData.tasks.push(newTask);

    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify(projectData),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    });
    if (!response.ok) {
      throw new Error("Failed to update the project");
    }

    return await response.json();
  } catch (error) {}
};

// Function to delete a task from a project
export const deleteTask = async (projectId, taskId) => {
  try {
    const projectResponse = await fetch(
      `http://localhost:3001/projects/${projectId}`
    );
    if (!projectResponse.ok) {
      throw new Error("Failed to fetch the project");
    }

    const projectData = await projectResponse.json();
    const updatedTasks = projectData.tasks.filter((task) => task.id !== taskId);

    const response = await fetch(
      `http://localhost:3001/projects/${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks: updatedTasks,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the task");
    }

    return taskId; // Return the deleted taskId if needed
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete the task");
  }
};

// Function to mark a task as completed
export const completeTask = async (projectId, taskId, completed) => {
  try {
    const projectResponse = await fetch(
      `http://localhost:3001/projects/${projectId}`
    );

    if (!projectResponse.ok) {
      throw new Error("Failed to fetch project data");
    }

    const projectData = await projectResponse.json();

    // Find the index of the task to update in the tasks array
    const taskIndex = projectData.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error("Task not found in the project");
    }

    // Update the task's completed status
    projectData.tasks[taskIndex].completed = completed;
    projectData.tasks = [...projectData.tasks];

    const response = await fetch(
      `http://localhost:3001/projects/${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to update task completion status");
    }

    return taskId; // Return the taskId if needed
  } catch (error) {
    console.error("Error updating task completion status:", error);
    throw new Error("Failed to update task completion status");
  }
};
