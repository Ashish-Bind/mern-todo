import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './utils/feature.js'
import router from './routes/todo.js'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

connectDB({ url: process.env.MONGO_URL })

app.use('/api/v1', router)

app.use((err, req, res, next) => {
  console.error(err.stack)
  const message = err?.message || 'Internal Sever Error'
  res.status(500).json({ success: false, message })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Sever started')
})
