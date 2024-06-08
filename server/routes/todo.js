import { Router } from 'express'
import { Todo } from '../models/todo.js'

const router = Router()

router.post('/new', async (req, res, next) => {
  const { title, desc } = req.body

  try {
    if (!title || !desc) {
      throw new Error('Please provide both title and description')
    }

    const response = await Todo.create({ title, desc })

    res.status(201).json({
      success: true,
      response,
    })
  } catch (err) {
    next(err)
  }
})

router.get('/todos', async (req, res, next) => {
  try {
    const todos = await Todo.find()
    res.status(200).json({ success: true, todos })
  } catch (err) {
    next(err)
  }
})

router.put('/update/:id', async (req, res, next) => {
  const { id } = req.params
  const { title, desc, isCompleted } = req.body

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, desc, isCompleted },
      { new: true }
    )
    if (!updatedTodo) {
      throw new Error('Todo not found')
    }
    res.status(200).json({ success: true, todo: updatedTodo })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id)
    if (!deletedTodo) {
      throw new Error('Todo not found')
    }
    res
      .status(200)
      .json({ success: true, message: 'Todo deleted successfully' })
  } catch (err) {
    next(err)
  }
})

export default router
