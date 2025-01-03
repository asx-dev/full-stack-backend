const mongoose = require('mongoose')

// Schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3 },
    number: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (value) {
          console.log('Validating:', value)
          return /^\d{2}-\d{6,}$/.test(value)
        },
        message: 'Invalid phone number',
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

// Model
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
