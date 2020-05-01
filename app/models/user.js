const generateSlug = require('../helpers/generateSlug')
const mongoose = require('mongoose')
// const JWT = require('../jwt')
// const jwt = new JWT()
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const ObjectId = Schema.ObjectId

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  hash: String,
  user_type: [String],
  city_name: String,
  street_name: String,
  vat_company: String,
  company_name: String,
  resume: Mixed,
  id: ObjectId,
  slug: String,
  profile_consultation_counter: Number,
  profile_picture: String,
  skills: [String],
  list_certifications: [ObjectId],
  list_replied_job: [ObjectId],
  list_posted_job: [ObjectId],
  creationDate: { type: Date, default: Date.now },
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

UserSchema.methods.setSlug = function () {
  this.slug = generateSlug(this.getFullName())
  return this
}
UserSchema.methods.getSlug = function () {
  return this.slug 
}

UserSchema.methods.getFullName = function () {
  return `${this.first_name} ${this.last_name.toUpperCase()}`
}

UserSchema.methods.setLastUpdate = function () {
  this.updated = Date.now
  return this
}

// UserSchema.methods.generateAuthToken = async function () {
//   // Generate an auth token for the user
//   const user = this
//   const token = jwt.JWTgenerator(user)
//   user.token = token
//   await user.save()
//   return token
// }

module.exports = UserSchema
