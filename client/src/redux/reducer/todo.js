import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  loading: false,
}

export const todoSlice = createSlice({
  name: 'todoReducer',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
  },
})

export const { setTodos } = todoSlice.actions
