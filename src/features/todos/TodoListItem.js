import React from 'react'

import { ReactComponent as TimesSolid } from './times-solid.svg'

const TodoListItem = React.memo(
  ({ todo, onColorChange, onCompletedChange, onDelete }) => {
    const { text, completed, id } = todo

    const handleCompletedChanged = (id) => {
      onCompletedChange(id)
    }

    return (
      <li>
        <div className="view">
          <div className="segment label">
            <input
              className="toggle"
              type="checkbox"
              checked={completed}
              onChange={() => handleCompletedChanged(id)}
            />
            <div className="todo-text">{text}</div>
          </div>
          <div className="segment buttons">
            <button className="destroy" onClick={() => onDelete(id)}>
              <TimesSolid />
            </button>
          </div>
        </div>
      </li>
    )
  }
)
export default TodoListItem
