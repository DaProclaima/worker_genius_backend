const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const Mixed = Schema.Types.Mixed
const generateSlug = require('../helpers/generateSlug')

const CertificationSchema = new mongoose.Schema({
  title: String,
  slug: String,
  timeout: Number,
  description: String,
  Id: ObjectId,
  project: Mixed,
  prerequisites: [String],
  picture: String,
  languages: [String],
  creator: String, // will take the Id of the creator,
  creationDate: { type: Date, default: Date.now },
  last_update: Date
}, {
  collection: 'certifications', 
  minimize: false, 
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

CertificationSchema.methods.setPicture = async function () {
  this.picture = '../../resources/images/code_js.jpg'
  return this
}
CertificationSchema.methods.setLastUpdate = async function () {
  this.updated = Date.now
  return this
}

CertificationSchema.methods.setSlug = function () {
  this.slug = generateSlug(this.title)
  return this
}

CertificationSchema.methods.getSlug = function () {
  return this.slug 
}

module.exports = CertificationSchema
