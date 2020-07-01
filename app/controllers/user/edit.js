const User = require('../../models/user')
// const auth = require('../../verifyToken.js')
// const auth = new auth()
const { validationEdit } = require('../../validations/user')

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
    this.app.put(`${this.apiPrefix}/user/edit/:id`, async (req, res) => {
      const { id } = req.params
      const { body } = req
      const updateObj = {}
      var query = {$or: [{slug: id}]}
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or.push({_id: id})
      }
      // validation, updateObj
      try {
        const { error } = validationEdit(body)
        if (error) {
          console.log(error)
          return res.status(403).send(error.details[0].message)
        }
      } catch (error) {
        console.log(error)
      }

      if (body.username) updateObj.username = body.username
      if (body.firstname) updateObj.firstname = body.firstname
      if (body.lastname) updateObj.lastname = body.lastname
      if (body.email) updateObj.email = body.email
      if (body.email) updateObj.email = body.email
      if (body.user_type) updateObj.user_type = body.user_type
      if (body.street_name_num) updateObj.street_name_num = body.street_name_num
      if (body.city_name) updateObj.city_name = body.city_name
      if (body.department_name) updateObj.department_name = body.department_name
      if (body.country_name) updateObj.country_name = body.country_name
      if (body.company_name) updateObj.company_name = body.company_name
      if (body.company_registration_number) updateObj.company_registration_number = body.company_registration_number
      if (body.resume) updateObj.resume = body.resume
      if (body.profile_consultation_counter) updateObj.profile_consultation_counter = body.profile_consultation_counter
      if (body.profile_picture) updateObj.profile_picture = body.profile_picture
      if (body.skills) updateObj.skills = body.skills
      if (body.list_certifications) updateObj.list_certifications = body.list_certifications
      if (body.list_replied_job) updateObj.list_replied_job = body.list_replied_job
      if (body.list_posted_job) updateObj.list_posted_job = body.list_posted_job
      if (body.list_bills) updateObj.list_bills = body.list_bills
      if (body.list_works) updateObj.list_works = body.list_works
      if (body.list_watched_candidates) updateObj.list_watched_candidates = body.list_watched_candidates

      this.UserModel.findOneAndUpdate(query, {
        username: updateObj.username,
        firstname: updateObj.firstname,
        lastname: updateObj.lastname,
        email: updateObj.email,
        user_type: updateObj.user_type,
        street_name_num: updateObj.street_name_num,
        city_name: updateObj.city_name,
        department_name: updateObj.department_name,
        country_name: updateObj.country_name,
        company_name: updateObj.company_name,
        company_registration_number: updateObj.company_registration_number,
        resume: updateObj.resume,
        profile_consultation_counter: updateObj.profile_consultation_counter,
        profile_picture: updateObj.profile_picture,
        skills: updateObj.skills,
        list_certifications: updateObj.list_certifications,
        list_replied_job: updateObj.list_replied_job,
        list_posted_job: updateObj.list_posted_job,
        list_bills: updateObj.list_bills,
        list_works: updateObj.list_works,
        list_watched_candidates: updateObj.list_watched_candidates,
        last_update: Date.now()
      }, {
        new: true,
        omitUndefined: true
      }).then(model => {
        model.setSlug()
        delete model.hash
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
