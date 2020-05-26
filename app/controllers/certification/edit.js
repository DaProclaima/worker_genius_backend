const Certification = require('../../models/certification')
const { validationEdit } = require('../../validations/certification')
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
    this.CertificationModel = connect.model('Certification', Certification)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put(`${this.apiPrefix}/certification/edit/:slug`, (req, res) => {
      const updateObj = {}
      const { slug } = req.params
      const { body } = req
      
      const { error } = validationEdit(body)
      if (error) { 
        console.log(error)
        return res.status(403).send(error.details[0].message)
      }
      if (body.title) updateObj.title = body.title
      if (body.timeout) updateObj.timeout = body.timeout
      if (body.description) updateObj.description = body.description
      if (body.project) updateObj.project = body.project
      if (body.prerequisite) updateObj.prerequisite = body.prerequisite
      if (body.languages) updateObj.languages = body.languages

      this.CertificationModel.findOneAndUpdate({slug: slug}, {
        $set: {
          updateObj,
          last_update: Date.now()
        }
      }, {
        new: true
      }).then(model => {  
        model.setSlug(updateObj.title)
        model.setLastUpdate()
        res.status(200).json(model || {})
      }).catch(err => {
        console.log(err)
        res.status(500).json({
          'code': 500,
          'message': err
        })
      })
    })

    this.app.put(`${this.apiPrefix}/certification/edit/:id`, (req, res) => {
      const { id } = req.params
      const { body } = req

      this.CertificationModel.findById(id, {
        $set: {
          title: body.title,
          timeout: body.timeout,
          description: body.description,
          project: body.project,
          prerequisite: body.prerequisite,
          languages: body.languages,
          last_update: Date.now()
        }
      }, {
        new: true
      }).then(model => {  
        model.setSlug()
        res.status(200).json(model || {})
      }).catch(err => {
        console.log(err)
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
