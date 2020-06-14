const Joi = require('@hapi/joi')
// const { Schema } = require('mongoose')
const validationNew = data => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    level: Joi.equal('JUNIOR', 'MEDIOR', 'SENIOR').required(),
    slug: Joi.forbidden(),
    publisher: Joi.string().required(), // todo id
    list_candidates: Joi.forbidden(),
    street_num_name: Joi.string().min(1).max(155).required(),
    department: Joi.string().min(1).max(155).required(),
    city_name: Joi.string().min(1).max(155).required(),
    country: Joi.string().min(1).max(155).required(),
    company_name: Joi.string().min(1).max(155).required(),
    description: Joi.string().min(1).max(155).required(),
    number_views: Joi.number().optional(),
    number_replies: Joi.forbidden(),
    picture: Joi.string().min(1).max(155).optional(),
    salary_per_year: Joi.number().min(0).required(),
    contract_type: Joi.string().equal('CDI', 'CDD', 'FREELANCE').required(),
    mission_length: Joi.number().min(-1).max(1000).required(),
    length_unit: Joi.string().equal('JOURS', 'MOIS', 'ANNÉES', 'N/A').required(),
    is_fulfilled: Joi.forbidden(),
    is_archived: Joi.forbidden(),
    list_required_certifications: Joi.array().has(String).required(), // todo array type
    creation_date: Joi.forbidden(),
    last_update: Joi.forbidden()
  })
  return schema.validate(data)
}

const validationEdit = data => {
  const schema = Joi.object().keys({
    title: Joi.string().optional(),
    level: Joi.equal('JUNIOR', 'MEDIOR', 'SENIOR').optional(),
    // slug: Joi.forbidden(),
    publisher: Joi.string(), // todo id
    list_candidates: Joi.array().has(String), // todo id
    // street_num_name: Joi.string().min(1).max(155).optional(),
    department: Joi.string().min(1).max(155).optional(),
    city_name: Joi.string().min(1).max(155).optional(),
    country: Joi.string().min(1).max(155).optional(),
    company_name: Joi.string().min(1).max(155).optional(),
    description: Joi.string().min(1).max(155).optional(),
    number_views: Joi.number().optional(),
    // number_replies: Joi.forbidden(),
    picture: Joi.string().min(1).max(155).optional(),
    salary_per_year: Joi.number().min(0).optional(),
    contract_type: Joi.string().equal('CDI', 'CDD', 'FREELANCE').optional(),
    mission_length: Joi.number().min(-1).max(1000).optional(),
    length_unit: Joi.string().equal('JOURS', 'MOIS', 'ANNÉES', 'N/A').optional(),
    // is_fulfilled: Joi.bool(),
    // is_archived: Joi.bool(),
    list_required_certifications: Joi.array().has(String).optional() // todo array type
    // creation_date: Joi.forbidden(),
    // last_update: Joi.forbidden()
  })
  return schema.validate(data)
}

module.exports.validationNew = validationNew
module.exports.validationEdit = validationEdit
