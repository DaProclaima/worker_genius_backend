const Joi = require('@hapi/joi')

const registerValidation = data => {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(6).required(),
    last_name: Joi.string().min(6).required(),
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    hash: Joi.string().min(6).required()
  })
  return schema.validate(data)
}

const loginValidation = data => {
  const schema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    hash: Joi.string().min(6).required()
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
