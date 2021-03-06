import mongoose from 'mongoose'

export default () => {
  const options = { useNewUrlParser: true, useUnifiedTopology: true }

  mongoose
    .connect(process.env.MONGODB_URL, options)
    .then(() => console.log('MongoDB connect success!'))
    .catch((error) => console.log(error))
}
