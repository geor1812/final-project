const mongoose = require('mongoose')
const crypto = require('crypto')

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: String,
  salt: String,
})

accountSchema.methods.setPassword = password => {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex')
  console.log('setting password')
  console.log(this.salt, this.hash)
}

accountSchema.methods.validPassword = password => {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex')
  return this.hash === hash
}

module.exports = mongoose.model('Account', accountSchema)
