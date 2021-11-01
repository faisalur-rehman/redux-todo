import { client } from '../../api/client'

export const todosLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  }
}

export const saveNewTodos = (todo) => {
  return {
    type: 'todos/todosAdded',
    payload: todo,
  }
}

const initialState = []

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todosLoaded': {
      return action.payload
    }
    case 'todos/todosAdded': {
      return [...state, action.payload]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/todoAllCompleted': {
      const todos = state.map((todo) => ({ ...todo, completed: true }))
      return todos
    }
    case 'todos/todoClearCompleted': {
      const remainingTodos = state.filter((todo) => todo.completed === false)
      return remainingTodos
    }

    case 'todos/todoRemoved': {
      const todos = state.filter((todo) => todo.id !== action.payload)
      return todos
    }
    default:
      return state
  }
}

export const fetchTodos = async (dispatch) => {
  const response = await client.get('/fakeApi/todos')
  dispatch(todosLoaded(response.todos))
}
export const saveNewTodo = (text) => async (dispatch) => {
  const response = await client.post('/fakeApi/todos', { todo: { text } })
  dispatch(saveNewTodos(response.todo))
}
