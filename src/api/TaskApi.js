// Define the base URL of the JSON Server
const apiUrl = "http://localhost:3001/projects";

// Create a new project
export const createTask = async (name, description) => {
  try {
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
      }),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create a new project");
    }

    return await response.json();
  } catch (error) {}
};

// Read a all Tasks by Project ID
export const getTasksByProjectId = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch project by ID");
    }

    return await response.json(); // Parse the response JSON
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Update an existing project by ID
export const updateProject = async (id, name, description) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
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
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Delete a project by ID
export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the project");
    }

    return true; // Deletion was successful
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
