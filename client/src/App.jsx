import { useEffect, useState } from 'react'
import {
  useAllTodosQuery,
  useNewTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from './redux/api/todo'
import { useDispatch, useSelector } from 'react-redux'
import { setTodos } from './redux/reducer/todo'

const App = () => {
  const [todo, setTodo] = useState({
    title: '',
    desc: '',
  })

  const { todos } = useSelector((state) => state.todoReducer)
  const dispatch = useDispatch()

  const { isError, isLoading, data } = useAllTodosQuery('')
  const [newTodo] = useNewTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setTodos(data.todos))
    }
  }, [data])

  const handleAddTodo = async () => {
    try {
      if (!todo.title || !todo.desc) {
        alert('Please Enter all fields')
        return
      }
      const response = await newTodo(todo)
      dispatch(setTodos([...todos, response.data.response]))
      setTodo({
        title: '',
        desc: '',
      })
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const handleUpdateTodo = async (id, updatedTitle, updatedDesc) => {
    try {
      const response = await updateTodo({
        todoId: id,
        updatedInfo: { title: updatedTitle, desc: updatedDesc },
      })
      const updatedTodos = todos.map((todo) =>
        todo._id === id
          ? {
              ...todo,
              title: updatedTitle,
              desc: updatedDesc,
              isEditing: false,
            }
          : todo
      )
      dispatch(setTodos(updatedTodos))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo({ todoId: id })
      const updatedTodos = todos.filter((todo) => todo._id !== id)
      dispatch(setTodos(updatedTodos))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await updateTodo({
        todoId: id,
        updatedInfo: { isCompleted: completed },
      })
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? response.data.todo : todo
      )
      dispatch(setTodos(updatedTodos))
    } catch (error) {
      console.error('Error updating todo status:', error)
    }
  }

  const handleEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, isEditing: true } : todo
    )
    dispatch(setTodos(updatedTodos))
  }

  const handleCancelEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, isEditing: false } : todo
    )
    dispatch(setTodos(updatedTodos))
  }

  return (
    <div className="max-w-screen-lg mx-auto space-y-4 my-6">
      <div className="space-x-2">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border outline-none"
          value={todo.title}
          onChange={(e) =>
            setTodo((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="p-2 border outline-none"
          value={todo.desc}
          onChange={(e) =>
            setTodo((prev) => ({ ...prev, desc: e.target.value }))
          }
        />
        <button
          className="px-5 py-2 bg-slate-600 text-white "
          onClick={handleAddTodo}
        >
          Add Task
        </button>
      </div>
      <div className="space-y-2">
        {todos.map((i) => (
          <div
            key={i._id}
            className="border p-4 md:flex justify-between space-y-2"
          >
            <div className="space-x-2 space-y-2">
              {i.isEditing ? (
                <>
                  <input
                    type="text"
                    value={i.title}
                    className="border outline-none p-2"
                    onChange={(e) => {
                      const updatedTitle = e.target.value
                      const updatedTodos = todos.map((todo) =>
                        todo._id === i._id
                          ? { ...todo, title: updatedTitle }
                          : todo
                      )
                      dispatch(setTodos(updatedTodos))
                    }}
                  />
                  <input
                    type="text"
                    value={i.desc}
                    className="border outline-none p-2"
                    onChange={(e) => {
                      const updatedDesc = e.target.value
                      const updatedTodos = todos.map((todo) =>
                        todo._id === i._id
                          ? { ...todo, desc: updatedDesc }
                          : todo
                      )
                      dispatch(setTodos(updatedTodos))
                    }}
                  />
                  <div className="space-x-2">
                    <button
                      onClick={() => handleUpdateTodo(i._id, i.title, i.desc)}
                      className="p-2 text-white bg-green-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleCancelEdit(i._id)}
                      className="p-2 text-white bg-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1
                    className={`font-bold text-2xl  ${
                      i.isCompleted && 'line-through text-gray-400'
                    }`}
                  >
                    {i.title}
                  </h1>
                  <p
                    className={`  ${
                      i.isCompleted && 'line-through text-gray-400'
                    }`}
                  >
                    {i.desc}
                  </p>
                </>
              )}
            </div>
            <div className="space-x-4">
              {!i.isEditing && (
                <button
                  onClick={() => handleEdit(i._id)}
                  className="px-5 py-2 text-white bg-yellow-500"
                >
                  Edit
                </button>
              )}
              <button
                className="px-5 py-2 text-white bg-green-500"
                onClick={() => handleToggleComplete(i._id, !i.isCompleted)}
              >
                {i.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                className="px-5 py-2 text-white bg-red-700"
                onClick={() => handleDeleteTodo(i._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
