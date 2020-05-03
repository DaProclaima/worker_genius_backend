const assertType = require('../helpers/assertType')
const mongoose = require('mongoose')
// const JWT = require('../jwt')
// const jwt = new JWT()
const Schema = mongoose.Schema
// const Mixed = Schema.Types.Mixed
const ObjectId = Schema.ObjectId

const MessageSchema = new mongoose.Schema({
  expeditor: [ObjectId],
  receiver: [ObjectId],
  content: String,
  id: ObjectId,
  creation_date: { type: Date, default: Date.now },
  last_update: Date
}, {
  collection: 'users', 
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

MessageSchema.methods.getExpeditor = function (id) {
  return this.expeditor
}

MessageSchema.methods.setReceiver = function (id) {
  // TODO: if user id exists then... 
  this.receiver = id
  return this
}

MessageSchema.methods.getReceiver = function (id) {
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
