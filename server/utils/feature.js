import mongoose from 'mongoose'

export const connectDB = ({ url }) => {
  mongoose
    .connect(url, { dbName: 'todo-application' })
    .then(() => console.log('Database connected'))
}
