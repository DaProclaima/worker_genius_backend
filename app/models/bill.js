const assertType = require('../helpers/assertType')
const mongoose = require('mongoose')
const listManager = require('../helpers/listManager')
// const JWT = require('../jwt')
// const jwt = new JWT()
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

// const ObjectId = Schema.ObjectId

const BillSchema = new Schema({
  title: String,
  amount: Number,
  owner_user_id: String, // will be ObjectId
  creation_date: { type: Date, required: true, default: Date.now },
  payment_date: Date, // if exists then bill got payed
  payment_option: { type: [String], required: true, enum: ['paypal', 'credit_card', 'debit_card'] },
  money_currency: { type: [String], required: true, enum: ['euro', 'dollar', 'pound'] },
  list_privileges: Mixed,
  last_update: Date
}, {
  collection: 'bills', 
  minimize: false, 
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

BillSchema.methods.setTitle = function (title) {
  this.title = assertType.checkString(title, 'Title')
  return this
}

BillSchema.methods.getTitle = function () { 
  return this.title
}

BillSchema.methods.setAmount = function (amount) {
  this.amount = assertType.checkNumber(amount, 'Amount')
  return this
}

BillSchema.methods.getAmount = function () {
  return this.amount
}

BillSchema.methods.setOwnerUserId = function (id) {
  this.owner_user_id = id
}

BillSchema.methods.getCreationDate = function () {
  return this.creation_date
}

BillSchema.methods.setPaymentDate = function () {
  this.payment_date = Date.now
  return this
}

BillSchema.methods.getPaymentDate = function () {
  return this.payment_date
}

BillSchema.methods.setPaymentOption = function (option) {
  this.payment_option = assertType.checkString(option, 'Payment option')
  return this
} 

BillSchema.methods.getPaymentOption = function () {
  return this.payment_option
}

BillSchema.methods.addPrivilege = function (el) {
  // TODO: how to check if the price matches with the granted privilege ?
  listManager.addElement(el, this.list_privileges)
  return this
}

BillSchema.methods.removePrivilege = function (el) {
  listManager.removeElement(el, this.list_privileges)
  return this
}

BillSchema.methods.getOnePrivilege = function (el) {
  listManager.getElementInList(el, this.list_privileges)
  return this
}

BillSchema.methods.getListPrivileges = function () {
  return this.list_privileges
}

BillSchema.methods.setLastUpdate = function () {
  this.last_update = Date.now
  return this
}

BillSchema.methods.getLastUpdate = function () {
  return this.last_update
}

module.exports = BillSchema
