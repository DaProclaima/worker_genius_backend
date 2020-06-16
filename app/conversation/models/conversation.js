const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId

const ConversationSchema = new Schema({
  expeditor_id: String, // ObjectId
  receiver_id: String, // ObjectId
  creation_date: { type: Date, default: Date.now }
}, {
  collection: 'conversations',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

ConversationSchema.methods.setExpeditor = function (id) {
  // TODO: if user id exists then...
  this.expeditor = id
  return this
}

ConversationSchema.methods.getExpeditor = function () {
  return this.expeditor
}

ConversationSchema.methods.setReceiver = function (id) {
  // TODO: if user id exists then...
  this.receiver = id
  return this
}

ConversationSchema.methods.getReceiver = function () {
  return this.receiver
}

ConversationSchema.methods.getCreationDate = function () {
  return this.creation_date
}

module.exports = ConversationSchema
