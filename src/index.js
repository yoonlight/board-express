import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import { expressCfg, mongooseCfg, passportCfg } from './lib'
import router from './router'

dotenv.config()
const port = process.env.PORT
const app = express()
mongooseCfg()
expressCfg(app)
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', router)
app.listen(port, () => {
  console.log('board server listen to', port)
})

passportCfg(passport)
