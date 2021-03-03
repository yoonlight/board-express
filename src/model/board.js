import mongoose from 'mongoose'
const { Schema } = mongoose

const boardSchema = new Schema({
  title: String,
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
  complete: { type: Boolean, default: false },
  rate: Number,
})

const board = mongoose.model('Board', boardSchema)

export default board
