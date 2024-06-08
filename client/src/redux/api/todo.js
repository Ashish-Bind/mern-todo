import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mern-todo-03ed.onrender.com/api/v1/',
  }),
  endpoints: (builder) => ({
    newTodo: builder.mutation({
      query: (order) => ({ url: 'new', method: 'POST', body: order }),
    }),
    updateTodo: builder.mutation({
      query: ({ todoId, updatedInfo }) => ({
        url: `update/${todoId}`,
        method: 'PUT',
        body: updatedInfo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: ({ todoId }) => ({
        url: `${todoId}`,
        method: 'DELETE',
      }),
    }),
    allTodos: builder.query({
      query: () => 'todos',
    }),
  }),
})

export const {
  useNewTodoMutation,
  useAllTodosQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi
