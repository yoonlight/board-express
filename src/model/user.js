import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'username is required',
  },
  password: String,
  email: {
    type: String,
    required: 'email is required',
  },
})

userSchema.plugin(passportLocalMongoose)

const user = mongoose.model('User', userSchema)

export default user
