import React, { useEffect } from 'react'
import TodoListItem from './TodoListItem'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchTodos } from './todosSlice'

const TodoList = () => {
  let todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filters)
  useEffect(() => {
    dispatch(fetchTodos)
    //eslint-disable-next-line
  }, [])
  if (filter.status === 'completed') {
    todos = todos.filter((todo) => todo.completed === true)
  }

  const onDelete = (id) => {
    dispatch({ type: 'todos/todoRemoved', payload: id })
  }

  const onCompletedChange = (id) => {
    dispatch({ type: 'todos/todoToggled', payload: id })
  }

  const renderedListItems = todos.map((todo) => {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onCompletedChange={onCompletedChange}
      />
    )
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
