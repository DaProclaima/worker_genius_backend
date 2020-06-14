const Joi = require('@hapi/joi')
// const { Schema } = require('mongoose')
const validationNew = data => {
  const schema = Joi.object().keys({
    slug: Joi.forbidden(),
    project: Joi.string().required(),
    candidate_id: Joi.string().required(),
    corrector_id: Joi.string(),
    watcher_id: Joi.string().required(),
    certification_id: Joi.string().required(),
    grade: Joi.forbidden(),
    creation_date: Joi.forbidden(),
    update_date: Joi.forbidden(),
    correction_date: Joi.forbidden()

  })
  return schema.validate(data)
}

const validationEdit = data => {
  const schema = Joi.object().keys({
    slug: Joi.forbidden(),
    project: Joi.forbidden(),
    candidate_id: Joi.forbidden(),
    corrector_id: Joi.string(),
    watcher_id: Joi.forbidden(),
    certification_id: Joi.forbidden(),
    grade: Joi.number().min(0).max(180),
    creation_date: Joi.forbidden(),
    update_date: Joi.forbidden(),
    correction_date: Joi.date()
  })
  return schema.validate(data)
}

module.exports.validationNew = validationNew
module.exports.validationEdit = validationEdit
