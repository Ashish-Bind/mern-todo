import { configureStore } from '@reduxjs/toolkit'
import { todoSlice } from './reducer/todo'
import { todoApi } from './api/todo'

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [todoSlice.name]: todoSlice.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat([todoApi.middleware]),
})
