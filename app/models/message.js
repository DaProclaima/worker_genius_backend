const assertType = require('../helpers/assertType')
const mongoose = require('mongoose')
// const auth = require('../auth')
// const auth = new auth()
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId

const MessageSchema = new Schema({
  expeditor_id: String, // ObjectId
  receiver_id: String, // ObjectId
  content: String,
  creation_date: { type: Date, default: Date.now },
  last_update: Date
}, {
  collection: 'messages', 
  minimize: false, 
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

MessageSchema.methods.setExpeditor = function (id) {
  // TODO: if user id exists then... 
  this.expeditor = id
  return this
}

MessageSchema.methods.getExpeditor = function () {
  return this.expeditor
}

MessageSchema.methods.setReceiver = function (id) {
  // TODO: if user id exists then... 
  this.receiver = id
  return this
}

MessageSchema.methods.getReceiver = function () {
  return this.receiver
}

MessageSchema.methods.setContent = function (content) {
  this.receiver = assertType.checkString(content, 'Content of the message')
  return this
}

MessageSchema.methods.getContent = function () { 
  return this.content
}

MessageSchema.methods.getCreationDate = function () { 
  return this.creation_date
}

MessageSchema.methods.setLastUpdate = function () { 
  this.last_update = Date.now
  return this
}
MessageSchema.methods.getLastUpdate = function () { 
  return this.last_update
}

module.exports = MessageSchema
