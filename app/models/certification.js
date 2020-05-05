const assertType = require('../helpers/assertType')
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
  project: Mixed,
  list_prerequisites: [String],
  picture: String,
  list_languages: [String],
  creatorId: [ObjectId], // will take the Id of the creator,
  creation_date: { type: Date, default: Date.now },
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

CertificationSchema.methods.setTitle = function (title) {
  try {
    if (title === 'string') {
      this.title = title
      return this
    }
    throw new Error('The title is not a string')
  } catch (error) {
    console.error(error)
  }
}

CertificationSchema.methods.getTitle = function () {
  return this.title
}

CertificationSchema.methods.getId = function () {
  return this._id
}

CertificationSchema.methods.setSlug = function () {
  this.slug = generateSlug(this.title)
  return this
}

CertificationSchema.methods.getSlug = function () {
  return this.slug 
}

CertificationSchema.methods.setTimeout = function (timeout) {
  try {
    if (typeof timeout === 'number') {
      this.timeout = timeout
      return this
    }
    throw new Error('The timeout is not a number')
  } catch (error) {
    console.error(error)
  }
}

CertificationSchema.methods.getTimeout = function () {
  return this.timeout
}

CertificationSchema.methods.setDescription = function (description) {
  try {
    if (typeof description === 'string') {
      this.description = description
      return this
    }
    throw new Error('The description is not a string')
  } catch (error) {
    console.error(error)
  }
}

CertificationSchema.methods.getDescription = function () {
  return this.description
}

CertificationSchema.methods.setProject = function (project) {
  this.project = project
}

CertificationSchema.methods.getProject = function () {
  return this.project
}

CertificationSchema.methods.addOnePrerequisite = function (prerequisite) {
  try {
    if (typeof prerequisite === 'string') {
      this.list_prerequisites.push({prerequisite})
      return this
    }
    throw new Error('The prerequisite is not a string')
  } catch (error) {
    console.error(error)
  }
}

CertificationSchema.methods.OnePrerequisite = function (prerequisite) {
  let index = this.list_prerequisites.findIndex(prerequisite)
  this.lists_prerequisites.splice(index)
  return this
}

CertificationSchema.methods.getListPrerequisites = function () {
  return this.list_prerequisites
}

CertificationSchema.methods.addOneLanguage = function (language) {
  try {
    if (typeof language === 'string') {
      this.list_languages.push({language})
      return this
    }
    throw new Error('The language is not a string')
  } catch (error) {
    console.error(error)
  }
}

CertificationSchema.methods.removeOneLanguage = function (language) {
  let index = this.list_languages.findIndex(language)
  this.list_language.splice(index)
}

CertificationSchema.methods.getListLanguages = function () {
  return this.list_languages
}

CertificationSchema.methods.setCreatorId = function (id) {
  // TODO try catch if Id exists then... else error can not be empty
  this.creatorId = id
}

CertificationSchema.methods.getCreatorId = function () {
  return this.creatorId
}

CertificationSchema.methods.getCreationDate = function () {
  return this.creation_date
}

CertificationSchema.methods.setPicture = function (picture) {
  this.picture = assertType.checkString(picture, 'Picture')
  return this
}

CertificationSchema.methods.getPicture = function () {
  return this.picture
}

CertificationSchema.methods.setLastUpdate = function () {
  this.updated = Date.now
  return this
}

CertificationSchema.methods.getLastUpdate = function () {
  return this.last_update 
}

module.exports = CertificationSchema
