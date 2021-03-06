import passportJWT from 'passport-jwt'
import { user } from '../model'

export default (passport) => {
  const JwtStrategy = passportJWT.Strategy
  const ExtractJwt = passportJWT.ExtractJwt
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.SERVER_SECRET_KEY
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      user.findOne({ id: jwt_payload.sub }, (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    })
  )

  passport.use(user.createStrategy())
  passport.serializeUser(user.serializeUser())
  passport.deserializeUser(user.deserializeUser())
}
