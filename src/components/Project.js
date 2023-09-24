import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TaskList from "../components/TaskList";

export default function Project({ project, onDelete }) {
  const [showTasks, setShowTasks] = useState(false);

  return (
    <>
      {project ? (
        <div className='card'>
          <div className='card-body'>
            <span className='btn btn-danger' onClick={onDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <h2 className='card-title'>{project.name}</h2>
            <p className='card-text'>{project.description}</p>
            <div>
              <button
                className='btn btn-primary'
                onClick={() => setShowTasks(!showTasks)}
              >
                {showTasks ? "Hide" : "Show"} Tasks
              </button>
            </div>
            {showTasks && <TaskList project={project} />}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
