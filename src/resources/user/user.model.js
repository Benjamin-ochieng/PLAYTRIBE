/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', function createHash(next) {
  if (!this.isModified('password')) return next()
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function checkPassword(password) {
  const hashedPassword = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

export const User = mongoose.model('User', userSchema)
