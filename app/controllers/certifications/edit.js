const Certification = require('../../models/certification')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()

/**
 * Create
 * @class
 */
class Edit {
  constructor (app, connect) {
    this.app = app
    this.CertificationModel = connect.model('Certification', Certification)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put('/api/v1/certification/edit/:slug', (req, res) => {
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
      }).then(certification => {  
        certification.generateSlug()
        certification.generateUpdated()
        res.status(200).json(certification || {})
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
