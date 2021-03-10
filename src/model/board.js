import mongoose from 'mongoose'
const { Schema } = mongoose

const boardSchema = new Schema({
  title: String,
  username: String,
  body: String,
  date: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  secret: { type: Boolean, default: false },
  comments: [
    {
      seq: Number,
      usernmae: String,
      body: String,
      secret: { type: Boolean, default: false },
      secretName: { type: Boolean, default: false },
      date: { type: Date, default: Date.now },
    },
  ],
  seq: Number,
  tags: [String],
  category: String,
  like: { type: Number, default: 0 },
  view: { type: Number, default: 0 },
})

const board = mongoose.model('Board', boardSchema)

export default board
