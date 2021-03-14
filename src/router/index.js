import express from 'express'
import board from './board'
import auth from './auth'
import passport from 'passport'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('Hello World!')
})

router.use('/board', passport.authenticate('jwt', { session: false }), board)
router.use('/auth', auth)

export default router
