const Certifications = require('../../models/certification')
// const User = require('../../models/user')

/**
 * Create
 * @class
 */
class New {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.CertificationModel = connect.model('Certifications', Certifications)
    // this.UserModel = connect.model('User', User)

    this.run()
  }
  /**
   * middleware
   */
  middleware () {
    this.app.post(`${this.apiPrefix}/certification/new`, async (req, res) => {
      try {
        const certificationModel = new this.CertificationModel(req.body)
        await certificationModel.generatePicture()
        certificationModel.generateSlug()
        await res.status(201).send({certificationModel})
        certificationModel.save()
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }
  /**
   * run
   */
  run () {
    this.middleware()
  }
}

module.exports = New
