import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { user } from '../model'
import { pagination } from '../lib/query'

const router = Router()

router.get('/user', async (req, res) => {
  const { perPage, pageNum } = pagination(req.query)
  const result = await user.find().skip(pageNum).limit(perPage)
  res.send(result)
})

router.post('/register', (req, res, next) => {
  const username = req.body.username
  user.register(
    new user({ username: username, email: req.body.email }),
    req.body.password,
    (err) => {
      if (err) return next(err)
      res.status(200).json({ message: 'register user' })
    }
  )
})

router.get('/login', (req, res) => {
  res.status(401).json({ message: 'login fail' })
})

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: 'login',
  }),
  async (req, res, next) => {
    const option = { expiresIn: '5m' }
    const secretOrKey = process.env.SERVER_SECRET_KEY
    const username = req.body.username
    req.login(user, { session: false }, async (error) => {
      if (error) next(error)
      const info = await user.findOne().where('username').equals(username)
      const token = jwt.sign({ uid: info._id }, secretOrKey, option)
      return res.json({ message: 'success', token })
    })
  }
)

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user)
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.json({ message: 'logout' })
})

export default router
