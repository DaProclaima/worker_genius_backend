const User = require('../../models/user')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()

/**
 * Create
 * @class
 */
class Edit {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.UserModel = connect.model('User', User)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put(`${this.apiPrefix}/user/edit/:slug`, (req, res) => {
      const { slug } = req.params
      const { body } = req

      this.UserModel.findOneAndUpdate({slug: slug}, {
        $set: {
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          hash: body.hash,
          user_type: body.user_type,
          city_name: body.city_name,
          street_name: body.street_name,
          vat_company: body.vat_company,
          company_name: body.company_name,
          resume: body.resume,
          profile_consultation_counter: body.profile_consultation_counter,
          profile_picture: body.profile_picture,
          skills: body.skills,
          list_certifications: body.list_certifications,
          list_replied_job: body.list_replied_job,
          list_posted_job: body.list_posted_job
        }
      }, {
        new: true
      }).then(model => {  
        model.setSlug()
        model.setLastUpdate()
        res.status(200).json(model || {})
      }).catch(err => {
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
