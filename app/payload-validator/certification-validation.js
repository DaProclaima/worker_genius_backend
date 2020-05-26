const Joi = require('@hapi/joi')
const { Schema } = require('mongoose')
const validation = data => {
  const schema = Joi.object().keys({
    title: Joi.string().min(6).max(50).required(),
    timeout: Joi.number().integer().min(0).required(),
    description: Joi.string().min(6).max(255).required(),
    project: Joi.object(),
    list_prerequisites: Joi.array(),
    picture: Joi.string().min(6).max(155),
    list_language: Joi.array(),
    creator_id: Joi.object(Schema.ObjectId)
  })
  return schema.validate(data)
}

module.exports.registerValidation = validation
