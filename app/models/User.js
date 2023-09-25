const bcrypt = require('bcrypt')

module.exports = (mongoose) => {
  const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: 'Email is required',
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    token: String,
    expiration: Date,
    image: String
  })

  // Hash password
  UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next()
    }

    this.password = await bcrypt.hash(this.password, 12)
    next()
  })

  // Send create user account alert
  UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next('The email you are trying to register is already registered')
    } else {
      next(error)
    }
  })

  // Auth user
  UserSchema.methods = {
    validateLoginPassword: function (password) {
      return bcrypt.compareSync(password, this.password)
    }
  }

  return mongoose.model('User', UserSchema)
}
