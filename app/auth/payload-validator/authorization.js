const Joi = require('@hapi/joi')

const registerValidation = data => {
  try {
    // console.log(data)
  
    const schema = Joi.object().keys({
      first_name: Joi.string().min(6).max(100).required(),
      last_name: Joi.string().min(6).max(100).required(),
      username: Joi.string().min(6).max(50).required(),
      email: Joi.string().min(6).email()
        .email().required(),
      hash: Joi.string().min(6).max(20).required(), // todo need regex for setting min one special char, one maj and one number
      verifyHash: Joi.string().min(6).max(20).equal(data.hash).required() // todo in frontend: not send request if hash field filled but verifyHash empty
    })
    return schema.validate(data)
  } catch (error) {
    return error
  }
}

const loginValidation = data => {
  const schema = Joi.object().keys({
    email: Joi.string().min(6).required(),
    hash: Joi.string().min(6).required()
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
