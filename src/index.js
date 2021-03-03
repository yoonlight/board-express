import express from 'express'
import dotenv from 'dotenv'
import expressConfig from './lib/express'
import router from './router'
dotenv.config()
const app = express()
expressConfig(app)
app.use('/', router)
app.listen(process.env.PORT, () => {
  console.log('board server listen to', process.env.PORT)
})
