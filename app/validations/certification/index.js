const Joi = require('@hapi/joi')
// const { Schema } = require('mongoose')
const validationNew = data => {
  const schema = Joi.object().keys({
    title: Joi.string().min(6).max(50).required(),
    timeout: Joi.number().integer().min(0).required(),
    description: Joi.string().min(6).max(1000).required(),
    project: Joi.string(),
    list_prerequisites: Joi.array().has(String),
    picture: Joi.string().min(6).max(155),
    list_languages: Joi.array()
  })
  return schema.validate(data)
}

const validationEdit = data => {
  const schema = Joi.object().keys({
    title: Joi.string().min(6).max(50),
    timeout: Joi.number().integer().min(0),
    description: Joi.string().min(6).max(1000),
    project: Joi.string(),
    list_prerequisites: Joi.array().has(String),
    picture: Joi.string().min(6).max(155),
    list_languages: Joi.array(),
    creator_id: Joi.string()
  })
  return schema.validate(data)
}

module.exports.validationNew = validationNew
module.exports.validationEdit = validationEdit
