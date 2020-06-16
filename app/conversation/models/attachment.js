// const assertType = require('../../helpers/assertType')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const ObjectId = Schema.ObjectId

const AttachmentSchema = new Schema({
  title: String,
  receiver_id: String, // ObjectId
  owner_id: String, // ObjectId
  room_id: String,
  path: String,
  creation_date: { type: Date, default: Date.now }
}, {
  collection: 'attachments',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

AttachmentSchema.methods.setExpeditor = function (id) {
  // TODO: if user id exists then...
  this.expeditor = id
  return this
}

AttachmentSchema.methods.getExpeditor = function () {
  return this.expeditor
}

AttachmentSchema.methods.setReceiver = function (id) {
  // TODO: if user id exists then...
  this.receiver = id
  return this
}

AttachmentSchema.methods.getReceiver = function () {
  return this.receiver
}

module.exports = AttachmentSchema
