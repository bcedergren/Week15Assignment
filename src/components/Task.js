import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Task({ title, completed, onDelete, onComplete }) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleCheckboxChange = () => {
    setIsCompleted(true);
    onComplete(isCompleted);
  };

  return (
    <div>
      <label>
        {isCompleted ? (
          <span style={{ color: "green" }} className='h5 m-4'>
            <FontAwesomeIcon icon={faCheckCircle} />
          </span>
        ) : (
          <input
            type='checkbox'
            checked={isCompleted}
            className='h5 m-4'
            onChange={handleCheckboxChange}
          />
        )}
      </label>
      <span className='h5'>{title}</span>
      <span onClick={onDelete} style={{ color: "red" }} className='h6 m-4'>
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
}
