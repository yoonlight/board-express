import mongoose from 'mongoose'
const { Schema } = mongoose

const boardSchema = new Schema({
  title: String,
  username: String,
  body: String,
  date: { type: Date, default: Date.now },
  secret: { type: Boolean, default: false },
})

const board = mongoose.model('Board', boardSchema)

export default board
