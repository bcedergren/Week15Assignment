import React, { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { createTask, completeTask, deleteTask } from "../api/ProjectApi";

export default function TaskList(props) {
  const project = props.project;
  const { tasks } = project;
  const [taskList, setTaskList] = useState(tasks);

  const handleSubmit = (newTask) => {
    // Create a new task object
    const taskToAdd = {
      id: new Date().getMilliseconds(),
      title: newTask.title,
      completed: false,
    };

    // Update the task list with the new task
    setTaskList([...taskList, taskToAdd]);
    createTask(taskToAdd, project.id);
  };

  const handleOnDelete = (taskId) => {
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTaskList);
    // delete the task from the
    deleteTask(project.id, taskId);
  };

  const handleOnComplete = (taskId) => {
    // update the task to completed
    completeTask(project.id, taskId, true);
  };

  return (
    <div className='container'>
      <p className='h5'>Task List</p>
      <ul className='list-group'>
        {taskList.map((task) => (
          <li key={task.id} className='list-group-item'>
            <Task
              title={task.title}
              completed={task.completed}
              onDelete={() => handleOnDelete(task.id)}
              onComplete={() => handleOnComplete(task.id)}
            />
          </li>
        ))}
      </ul>
      <TaskForm onHandleSubmit={handleSubmit} projectId={project.projectId} />
    </div>
  );
}
