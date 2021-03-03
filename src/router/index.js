import express from 'express'
import board from './board'
import auth from './auth'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('Hello World!')
})

router.use('/board', board)
router.use('/auth', auth)

export default router
