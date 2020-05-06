const assertType = require('../helpers/assertType')
const generateSlug = require('../helpers/generateSlug')
const mongoose = require('mongoose')
const listManager = require('../helpers/listManager')
// const JWT = require('../jwt')
// const jwt = new JWT()
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  first_name: String,
  last_name: String,
  email: { type: String, unique: true, required: true },
  hash: String,
  user_type: [String],
  street_name: String,
  city_name: String,
  department_name: String,
  country_name: String,
  company_name: String,
  company_vat: String,
  resume: Mixed,
  slug: String,
  profile_consultation_counter: Number,
  profile_picture: String,
  list_skills: [String], // TODO: will become a model for v2 ( creation date, title, id, list_has_candidates)
  list_certifications: [ObjectId],
  list_replied_job: [ObjectId],
  list_posted_job: [ObjectId],
  list_bills: [ObjectId],
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

UserSchema.methods.setUsername = function (name) {
  this.username = assertType.checkString(name, 'Username')
  return this
}

UserSchema.methods.getUsername = function () {
  return this.username
}

UserSchema.methods.setFirstName = function (firstName) {
  this.first_name = assertType.checkString(firstName, 'First name')
  return this
}

UserSchema.methods.getFirstName = function () {
  return this.first_name
}

UserSchema.methods.setLastName = function (lastName) {
  this.last_name = assertType.checkString(lastName, 'Last name')
  return this
}

UserSchema.methods.getLastName = function () {
  return this.last_name
}

UserSchema.methods.setEmail = function (email) {
  this.email = assertType.checkString(email, 'Email')
  return this
}

UserSchema.methods.getEmail = function () {
  return this.email
}

UserSchema.methods.setHash = function (hash) {
  this.hash = assertType.checkString(hash, 'Hash')
  return this
}

UserSchema.methods.getHash = function () {
  return this.hash
}

UserSchema.methods.addUserType = function (type) {
  if (type === assertType.checkString(type, 'User type')) {
    if (this.user_type.indexOf(type) < 1) {
      if (type === 'admin') {
        this.user_type = type
        return this
      } else if (type === 'candidate') {
        this.user_type = type
        return this
      } else if (type === 'enterprise') {
        this.user_type = type
        return this
      } else {
        console.error(new Error('The given user type does not exist.'))
      }
    }
  }
}

UserSchema.methods.removeUserType = function (type) {
  if (type === assertType.checkString(type, 'User type')) {
    const index = this.user_type.indexOf(type)
    if (index !== null) {
      this.user_type.splice(index)
      return this
    }
  }  
}

UserSchema.methods.getUserType = function () {
  return this.user_type
}

UserSchema.methods.setStreetName = function (street) {
  this.street_name = assertType.checkString(street, 'Street name')
  return this
}

UserSchema.methods.getStreetName = function () {
  return this.street_name
}

UserSchema.methods.setCityName = function (city) {
  this.city_name = assertType.checkString(city, 'City name')
  return this
}

UserSchema.methods.getCityName = function () {
  return this.city_name
}

UserSchema.methods.setDepartmentName = function (dept) {
  this.department_name = assertType.checkString(dept, 'Department name')
  return this
}

UserSchema.methods.getDepartmentName = function () {
  return this.department_name
}

UserSchema.methods.setCountryName = function (country) {
  this.country_name = assertType.checkString(country, 'Country name')
  return this
}

UserSchema.methods.getCountryName = function () {
  return this.country_name
}

UserSchema.methods.setCompanyName = function (company) {
  this.company_name = assertType.checkString(company, 'Company name')
  return this
}

UserSchema.methods.getCompanyName = function () {
  return this.company_name
}

UserSchema.methods.setCompanyVat = function (vat) {
  this.company_vat = assertType.checkString(vat, 'Company VAT')
  return this
}

UserSchema.methods.getCompanyVat = function () {
  return this.company_vat
}

UserSchema.methods.setResume = function (resume) {
  // TODO: find a way to check type
  this.resume = resume
  return this
}

UserSchema.methods.getResume = function () {
  return this.resume
}

UserSchema.methods.getId = function () {
  return this._id
}

UserSchema.methods.setSlug = function () {
  this.slug = generateSlug(this.username)
  return this
}

UserSchema.methods.getSlug = function () {
  return this.slug 
}

UserSchema.methods.addOneProfileConsultationCounter = function (viewerId) {
  // TODO: check if Id exists
  this.profile_consultation_counter.push({
    viewer_id: viewerId,
    view_date: Date.now
  })
  return this
}

UserSchema.methods.getProfileConsultationCounter = function () {
  return this.profile_consultation_counter
}

UserSchema.methods.setPicture = function (picture) {
  this.profile_picture = assertType.checkString(picture, 'Picture')
  return this
}

UserSchema.methods.getProfilePicture = function () {
  return this.profile_picture
}

UserSchema.methods.addSkill = function (skill) {
  if (skill === assertType.checkString(skill, 'Skill')) {
    if (this.list_skills.indexOf(skill) < 1) {
      this.list_skills.push(skill)
      return this
    }
  }
}

UserSchema.methods.removeSkill = function (skill) {
  if (skill === assertType.checkString(skill, 'Skill')) {
    let index = this.list_skills.indexOf(skill)
    if (index !== null) {
      this.list_skills.splice(index)
      return this
    } else {
      console.error(new Error('The given skill to remove does not exist.'))
    }
  }
}

UserSchema.methods.getListSkills = function () {
  return this.list_skills
}

UserSchema.methods.addCertification = function (certification) {
  // TODO: if certification exists then...
  if (this.list_certifications.indexOf(certification) < 1) {
    this.list_certifications.push(certification)
    return this
  }
}

UserSchema.methods.removeCertification = function (certification) {
  // TODO: check if certification exists then...    
  let index = this.list_certifications.indexOf(certification)
  if (index !== null) {
    this.list_certifications.splice(index)
    return this
  } else {
    console.error(new Error('The given certification to remove does not exist.'))
  }
}

UserSchema.methods.getListCertifications = function () {
  return this.list_certifications
}

UserSchema.methods.addPostedJob = function (job) {
  // TODO: if job offer exists then... else error
  if (this.list_posted_job.indexOf(job) < 1) {
    this.list_posted_job.push(job)
    return this
  }
}

UserSchema.methods.removePostedJob = function (job) {
  // TODO: check if certification exists then...    
  let index = this.list_posted_job.indexOf(job)
  if (index !== null) {
    this.list_posted_job.splice(index)
    return this
  } else {
    console.error(new Error('The given posted job offer to remove does not exist.'))
  }
}

UserSchema.methods.getListPostedJobs = function () {
  return this.list_posted_job
}

UserSchema.methods.addRepliedJob = function (job) {
  // TODO: if job offer exists then... else error
  if (this.list_replied_job.indexOf(job) < 1) {
    this.list_replied_job.push(job)
    return this
  }
}

UserSchema.methods.removeRepliedJob = function (job) {
  // TODO: check if certification exists then...    
  let index = this.list_replied_job.indexOf(job)
  if (index !== null) {
    this.list_replied_job.splice(index)
    return this
  } else {
    console.error(new Error('The given replied job offer to remove does not exist.'))
  }
}

UserSchema.methods.getListRepliedJobs = function () {
  return this.list_replied_job
}

UserSchema.methods.addBill = function (id) {
  // TODO: if bill id exists then... else error
  listManager.addElement(this.list_bills, id)
  return this
}

UserSchema.methods.removeBill = function (id) {
  // TODO: check if certification exists then...
  listManager.removeElement(this.list_bills, id)
  return this
}

UserSchema.methods.getOneBill = function (id) {
  return listManager.getElementInList(this.list_bills, id)
}

UserSchema.methods.getListRepliedJobs = function () {
  return this.list_replied_job
}
UserSchema.methods.getCreationDate = function () {
  return this.creation_date
}

UserSchema.methods.setLastUpdate = function () {
  this.last_update = Date.now
  return this
}

UserSchema.methods.getLastUpdate = function () {
  return this.last_update
}

UserSchema.methods.getFullName = function () {
  return `${this.first_name} ${this.last_name.toUpperCase()}`
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
