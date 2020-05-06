const JobOffer = require('../../models/job-offer')
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
    this.app.put(`${this.apiPrefix}/job-offer/edit/:slug`, (req, res) => {
      const { slug } = req.params
      const { body } = req

      this.JobOfferModel.findOneAndUpdate({slug: slug}, {
        $set: {
          title: body.title,
          level: body.level,
          street_num_name: body.street_num_name,
          city_name: body.city_name,
          department: body.department,
          country: body.country,
          company_name: body.company_name,
          description: body.description,
          picture: body.picture,
          salary_per_year: body.salary_per_year,
          contract_type: body.contract_type,
          mission_length: body.mission_length,
          length_unit: body.length_unit,
          is_fulfilled: body.is_fulfilled,
          is_archived: body.is_archived,
          list_required_certifications: body.list_required_certifications,
          last_update: Date.now()
        }
      }, {
        new: true
      }).then(model => {  
        model.setSlug()
        model.setLastUpdate()
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
