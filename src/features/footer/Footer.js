import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { StatusFilters } from '../filters/filtersSlice'

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const Footer = () => {
  const remaining = useSelector((state) => {
    const remainingTodos = state.todos.filter(
      (todo) => todo.completed === false
    )
    return remainingTodos
  })
  const filter = useSelector((state) => state.filters)

  const dispatch = useDispatch()

  const markAllCompleted = () => {
    dispatch({ type: 'todos/todoAllCompleted' })
  }
  const clearCompleted = () => {
    dispatch({ type: 'todos/todoClearCompleted' })
  }

  const onStatusChange = (status) =>
    dispatch({ type: 'filters/statusFilterChanged', payload: status })

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={markAllCompleted}>
          Mark All Completed
        </button>
        <button className="button" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={remaining.length} />
      <StatusFilter value={filter.status} onChange={onStatusChange} />
    </footer>
  )
}

export default Footer
