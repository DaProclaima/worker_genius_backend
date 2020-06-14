const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const refreshTokenSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    unique: true
  },
  string: {
    type: String,
    required: true,
    unique: true
  }
}, {
  collection: 'refresh_tokens', 
  minimize: false, 
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = refreshTokenSchema
