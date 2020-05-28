const Joi = require('@hapi/joi')
// const { Schema } = require('mongoose')

const validationEdit = data => {
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(50).optional(),
    first_name: Joi.string().min(5).max(155).optional(),
    last_name: Joi.string().min(5).max(155).optional(),
    email: Joi.string().min(1).max(50).email().optional(),
    hash: Joi.forbidden(),
    verifyHash: Joi.forbidden(),
    birth_date: Joi.date().optional(),
    phone_number: Joi.string().min(1).max(20).optional(),
    user_type: Joi.array().items('ADMIN', 'COMPANY', 'WATCHER', 'CANDIDATE', 'TEST_WRITER').optional(),
    street_name_num: Joi.string().min(5).max(155).optional(),
    city_name: Joi.string().min(5).max(155).optional(),
    department_name: Joi.string().min(1).max(155).optional(),
    country_name: Joi.string().min(1).max(155).optional(),
    company_name: Joi.string().min(1).max(155).optional(),
    company_vat: Joi.string().min(1).max(50).optional(), // TODO regex VAT number
    resume: Joi.any().optional(), // TODO regex ? complicated as we ignore all file types
    slug: Joi.forbidden(),
    profile_consultation_counter: Joi.number().max(1000).optional(),
    profile_picture: Joi.string().min(5).max(155).optional(), // TODO file type binary ?
    list_skills: Joi.array().has(String).optional(), // TODO ObjectId
    list_certifications: Joi.array().has(String).optional(), // TODO ObjectId
    list_replied_job: Joi.array().has(String).optional(), // TODO ObjectId
    list_posted_job: Joi.array().has(String).optional(), // TODO ObjectId
    list_bills: Joi.array().has(String).optional(), // TODO ObjectId
    list_works: Joi.array().has(String).optional(), // TODO ObjectId
    list_watched_candidates: Joi.array().has(String).optional(), // TODO ObjectId
    creation_date: Joi.forbidden(),
    last_update: Joi.forbidden()
  // token: String // TODO: will it stay here ??
  })
  return schema.validate(data) // TODO custom the error msg
}
const updatePassword = data => {
  const schema = Joi.object().keys({
    hash: Joi.string().min(6).max(20).required(), // todo need regex for setting min one special char, one maj and one number
    verifyHash: Joi.string().min(6).max(20).equal(data.hash).required() // todo in frontend: not send request if hash field filled but verifyHash empty
  })
  return schema.validate(data)
}

module.exports.validationEdit = validationEdit
module.exports.updatePassword = updatePassword
