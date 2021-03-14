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

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.isAuthenticated()) {
      res.send('success')
    } else {
      res.status(404).json('failure')
    }
  }
)

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
    req.login(user, { session: false }, (error) => {
      if (error) next(error)
      const token = jwt.sign(
        { uid: user._id },
        process.env.SERVER_SECRET_KEY,
        option
      )
      console.log(user._id)

      return res.json({ message: 'success', token })
    })
  }
)

router.get(
  '/a',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send()
  }
)

router.post(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user.profile)
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.json({ message: 'logout' })
})

router.get('/me', function (req, res) {
  var token = req.headers['x-access-token']
  console.log(req.headers)
  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, process.env.SERVER_SECRET_KEY, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })

    res.status(200).send(decoded)
  })
})

export default router
