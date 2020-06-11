const JobOffer = require('../../models/job-offer')
const { validationEdit } = require('../../validations/job-offer')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()

/**
 * Edit
 * @class
 */
class Edit {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.JobOfferModel = connect.model('JobOffer', JobOffer)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put(`${this.apiPrefix}/job-offer/edit/:slug`, async (req, res) => {
      const updateObj = {}
      const { slug } = req.params
      const { body } = req
      
      try {
        const { error } = validationEdit(body)
        if (error) { 
          console.log(error)
          return res.status(403).send(error.details[0].message)
        }
      } catch (error) {
        console.log(error)
      }

      if (body.title) updateObj.title = body.title
      if (body.level) updateObj.level = body.level
      if (body.publisher) updateObj.publisher = body.publisher
      if (body.list_candidates) updateObj.list_candidates = body.list_candidates
      if (body.street_num_name) updateObj.street_num_name = body.street_num_name
      if (body.city_name) updateObj.city_name = body.city_name
      if (body.department) updateObj.department = body.department
      if (body.country) updateObj.country = body.country
      if (body.company_name) updateObj.company_name = body.company_name
      if (body.description) updateObj.description = body.description
      if (body.number_views) updateObj.number_views = body.number_views
      if (body.list_applications) updateObj.list_applications = body.list_applications
      if (body.picture) updateObj.picture = body.picture
      if (body.salary_per_year) updateObj.salary_per_year = body.salary_per_year
      if (body.contract_type) updateObj.contract_type = body.contract_type
      if (body.mission_length) updateObj.mission_length = body.mission_length
      if (body.length_unit) updateObj.length_unit = body.length_unit
      if (body.is_fulfilled) updateObj.is_fulfilled = body.is_fulfilled
      if (body.list_required_certifications) updateObj.list_required_certifications = body.list_required_certifications
      console.log(updateObj)
      this.JobOfferModel.findOneAndUpdate(
        {
          slug: slug
        },
        { 
          title: updateObj.title,
          level: updateObj.level,
          publisher: updateObj.publisher,
          list_candidates: updateObj.list_candidates,
          street_num_name: updateObj.street_num_name,
          city_name: updateObj.city_name,
          department: updateObj.department,
          country: updateObj.country,
          company_name: updateObj.company_name,
          description: updateObj.description,
          number_views: updateObj.number_views,
          list_applications: updateObj.list_applications,
          picture: updateObj.picture,
          salary_per_year: updateObj.salary_per_year,
          contract_type: updateObj.contract_type,
          mission_length: updateObj.mission_length,
          length_unit: updateObj.length_unit,
          is_fulfilled: updateObj.is_fulfilled,
          list_required_certifications: updateObj.list_required_certifications,
          last_update: Date.now()
        }, {
          new: true,
          omitUndefined: true
        }
      ).then(model => {  
        console.log(model)
        model.setSlug(model.id)
        res.status(200).json(model || {})
      }).catch(err => {
        console.error(err)
        res.status(500).json({
          'code': 500,
          'message': err
        })
      })
    })
  }
  /**
   * run
   */
  run () {
    this.middleware()
  }
}

module.exports = Edit
