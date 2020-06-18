const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
  message: {
    type: String
  },
  sender: {
    type: String // , TODO: ObjectId
    // ref: 'User'
  },
  type: {
    type: String
  }
}, {
  timestamps: true
}, {
  collection: 'chats',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = ChatSchema
