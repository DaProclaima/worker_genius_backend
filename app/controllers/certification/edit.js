const Certification = require('../../models/certification')
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
    this.CertificationModel = connect.model('Certification', Certification)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put(`${this.apiPrefix}/certification/edit/:slug`, (req, res) => {
      const { slug } = req.params
      const { body } = req

      this.CertificationModel.findOneAndUpdate({slug: slug}, {
        $set: {
          title: body.title,
          timeout: body.timeout,
          description: body.description,
          project: body.project,
          prerequisite: body.prerequisite,
          languages: body.languages
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
