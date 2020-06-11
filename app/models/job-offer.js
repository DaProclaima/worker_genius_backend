const generateSlug = require('../helpers/generateSlug')
const mongoose = require('mongoose')
// const JWT = require('../jwt')
// const jwt = new JWT()
const Schema = mongoose.Schema
// const Mixed = Schema.Types.Mixed
// const ObjectId = Schema.ObjectId

const JobOfferSchema = new Schema({
  title: String,
  level: String,
  slug: String,
  publisher: String, // todo id
  list_candidates: [String], // candidate and hour they replied // todo id
  street__num_name: String,
  city_name: String,
  department: String,
  country: String,
  company_name: String,
  description: String,
  number_views: Number,
  profile_description: String, // TODO
  list_applications: Number,
  picture: String,
  salary_per_year: Number,
  contract_type: String,
  mission_length: Number,
  length_unit: String,
  is_fulfilled: Boolean,
  list_required_certifications: [String], // todo id
  creation_date: { type: Date, default: Date.now },
  last_update: Date
}, {
  collection: 'job_offers', 
  minimize: false, 
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

JobOfferSchema.methods.setTitle = function (title) {
  try {
    if (title === 'string') {
      this.title = title.toLowerCase()
      return this
    }
    throw new Error('The title is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getTitle = function () {
  return this.title
}

JobOfferSchema.methods.setSlug = function (id) {
  this.slug = `${generateSlug(this.getTitle())}-${id}`
  return this
}

JobOfferSchema.methods.getSlug = function () {
  return this.slug 
}

JobOfferSchema.methods.setPublisher = function (publisher) {
  // TODO try catch and if publisher exists then link him to this job offer
  this.publisher = publisher
  return this
}

JobOfferSchema.methods.getPublisher = function () {
  return this.publisher 
}

JobOfferSchema.methods.addOneCandidate = function (candidate) {
  // TODO try catch and if candidates exists then link him to this job offer
  this.list_candidates.push({
    candidate: candidate,
    responseDate: Date.now
  })
  return this
}

JobOfferSchema.methods.getListCandidates = function () {
  return this.list_candidates
}

JobOfferSchema.methods.setStreetName = function (streetName) {
  try {
    if (typeof streetName === 'string') {
      this.street__num_name = streetName
      return this
    }
    throw new Error('The street name is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getStreetName = function () {
  return this.street__num_name 
}

JobOfferSchema.methods.setCityName = function (cityName) {
  try {
    if (typeof cityName === 'string') {
      this.city_name = cityName
      return this
    }
    throw new Error('The city name is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getCityName = function () {
  return this.city_name 
}

JobOfferSchema.methods.setDepartment = function (department) {
  try {
    if (typeof department === 'string') {
      this.department = department
      return this
    }
    throw new Error('The department name is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getDepartment = function () {
  return this.department 
}

JobOfferSchema.methods.setCountry = function (country) {
  try {
    if (typeof country === 'string') {
      this.country = country
      return this
    }
    throw new Error('The country name is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getCountry = function () {
  return this.country 
}

JobOfferSchema.methods.setCompanyName = function (companyName) {
  try {
    if (typeof companyName === 'string') {
      this.company_name = companyName
      return this
    }
    throw new Error('The company name is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getCompanyName = function () {
  return this.company_name 
}

JobOfferSchema.methods.setDescription = function (description) {
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

JobOfferSchema.methods.getDescription = function () {
  return this.slug 
}

JobOfferSchema.methods.initNumberViews = function () {
  this.number_viewed = 0
  return this
}

JobOfferSchema.methods.addNumberViews = function () {
  this.number_viewed += 1
  return this
}

JobOfferSchema.methods.initNumberReplies = function () {
  this.list_applications = 0
  return this
}

JobOfferSchema.methods.addNumberReplies = function () {
  this.list_applications += 1
  return this
}

JobOfferSchema.methods.setPicture = function (picture) {
  try {
    if (typeof picture === 'string') {
      this.picture = picture
      return this
    }
    throw new Error('The picture url is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getPicture = function () {
  return this.picture
}

JobOfferSchema.methods.setLevel = function (level) {
  try {
    if (typeof level === 'string') {
      if (level === 'junior') {
        this.level = level
        return
      }

      if (level === 'medior') {
        this.level = level
        return
      }

      if (level === 'senior') {
        this.level = level
        return
      } else {
        console.error('The level given does not exist.')
        return
      }
    }
    throw new Error('The level given is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getLevel = function () {
  return this.level
}

JobOfferSchema.methods.setSalary = function (salary) {
  try {
    if (typeof picture === 'number') {
      this.salary_per_year = salary
      return this
    }
    throw new Error('The salary per year is not a number')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getSalary = function () {
  return this.salary_per_year
}

JobOfferSchema.methods.setMissionLength = function (length) {
  try {
    if (typeof length === 'number') {
      this.mission_length = length
      return this
    }
    throw new Error('The mission length is not a number')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getMissionLength = function () {
  return this.mission_length 
}

JobOfferSchema.methods.setLengthUnit = function (unit) {
  try {
    if (typeof unit === 'string') {
      if (unit === 'month') {
        this.length_unit = unit
        return
      }

      if (unit === 'year') {
        this.length_unit = unit
        return
      } else {
        console.error('the length unit does not exist.')
        return
      }
    }
    throw new Error('The length unit is not a string')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getLengthUnit = function () {
  return this.length_unit 
}

JobOfferSchema.methods.setIsFulfilled = function (bool) {
  try {
    if (bool === true || bool === false) {
      this.is_fulfilled = bool
      return this
    }
    throw new Error('The fulfilled status given for the job offer should be true or false.')
  } catch (error) {
    console.error(error)
  }
}

JobOfferSchema.methods.getIsFulfilled = function () {
  return this.is_fulfilled
}

JobOfferSchema.methods.addOneRequiredCertification = function (id) {
  // TODO try catch and if candidates exists then link him to this job offer
  this.list_required_certifications.push({id})
  return this
}

JobOfferSchema.methods.removeOneRequiredCertification = function (id) {
  // TODO try catch and if id exists then link him to this job offer
  let index = this.list_required_certifications.findIndex(id)
  this.list_required_certifications.splice(index)
  return this
}

JobOfferSchema.methods.getListRequiredCertifications = function () {
  return this.list_required_certifications
}

JobOfferSchema.methods.getCreationDate = function () {
  return this.creation_date
}

JobOfferSchema.methods.setLastUpdate = function () {
  this.updated = Date.now
  return this
}

JobOfferSchema.methods.getLastUpdate = function () {
  return this.last_update 
}

// UserSchema.methods.generateAuthToken = async function () {
//   // Generate an auth token for the user
//   const user = this
//   const token = jwt.JWTgenerator(user)
//   user.token = token
//   await user.save()
//   return token
// }

module.exports = JobOfferSchema
