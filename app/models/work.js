// const assertType = require('../helpers/assertType')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId
const Mixed = Schema.Types.Mixed

const WorkSchema = new Schema({
  slug: String, // concats certif title, candidateLastName and creationDate
  project: Mixed,
  candidate_id: [String],
  corrector_id: [String],
  watcher_id: [String],
  certification_id: [String], 
  grade: Number,
  creation_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: null},
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

module.exports = WorkSchema
