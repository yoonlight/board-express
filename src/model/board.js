import mongoose from 'mongoose'
const { Schema } = mongoose

const boardSchema = new Schema({
  title: String,
  username: String,
  body: String,
  date: { type: Date, default: Date.now },
  secret: { type: Boolean, default: false },
  comments: [
    {
      id: Number,
      usernmae: String,
      body: String,
      secret: { type: Boolean, default: false },
      secretName: { type: Boolean, default: false },
      date: { type: Date, default: Date.now },
    },
  ],
  id: Number,
  tags: [String],
  category: String,
  like: Number,
  view: Number,
})

const board = mongoose.model('Board', boardSchema)

export default board
