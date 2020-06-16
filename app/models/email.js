const assertType = require('../helpers/assertType')
const mongoose = require('mongoose')
// const auth = require('../auth')
// const auth = new auth()
const Schema = mongoose.Schema
// const Mixed = Schema.Types.Mixed
const ObjectId = Schema.ObjectId

const EmailSchema = new Schema({
  expeditor_email: String,
  fullname_expeditor: String,
  receiver_email: { type: String, default: 'admin@workergenius.com' },
  expeditor_id: [ObjectId],
  content: String,
  creation_date: { type: Date, default: Date.now }
}, {
  collection: 'emails', 
  minimize: false, 
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

EmailSchema.methods.setEmailExpeditor = function (email) {
  // TODO: if user id exists then... 
  this.email_expeditor = assertType.checkString(email, 'Expeditor email')
  return this
}

EmailSchema.methods.getEmailExpeditor = function () {
  return this.email_expeditor
}

EmailSchema.methods.setEmailReceiver = function (email) {
  this.email_receiver = assertType.checkString(email, 'Admin email address')
  return this
}

EmailSchema.methods.getEmailReceiver = function () {
  return this.email_receiver
}

EmailSchema.methods.setContent = function (content) {
  this.content = assertType.checkString(content, 'Content of the message')
  return this
}

EmailSchema.methods.getContent = function () { 
  return this.content
}

EmailSchema.methods.getId = function () { 
  return this._id
}

EmailSchema.methods.getCreationDate = function () { 
  return this.creation_date
}

module.exports = EmailSchema
