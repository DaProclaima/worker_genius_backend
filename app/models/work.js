// const assertType = require('../helpers/assertType')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId
const Mixed = Schema.Types.Mixed
const generateSlug = require('../helpers/generateSlug')

const WorkSchema = new Schema({
  slug: String, // concats certif title, candidateLastName
  project: Mixed,
  candidate_id: [String],
  corrector_id: [String],
  watcher_id: [String],
  certification_id: [String], 
  grade: Number,
  requested_date: Date, // TODO to add in validation
  test_location_id: String, // TODO to add in validation + ObjectId
  creation_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: null },
  correction_date: { type: Date, default: null }
}, {
  collection: 'works', 
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

WorkSchema.methods.setSlug = function (slug) {
  this.slug = generateSlug(slug)
  return this
}

WorkSchema.methods.getSlug = function () {
  return this.slug 
}

WorkSchema.methods.getCandidateId = function () {
  return this.candidate_id
}

WorkSchema.methods.getCertificationId = function () {
  return this.certification_id
}

module.exports = WorkSchema
