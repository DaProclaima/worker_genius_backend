const Certification = require('../../models/certification')
// const auth = require('../../auth.js')
// const auth = new auth()
/**
 * Create
 * @class
 */
class Show {
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
    this.app.get(`${this.apiPrefix}/certification/show/:slug`, async (req, res) => {
      const { slug } = req.params
      let query = this.CertificationModel.where({slug: slug})
      query.findOne(function (_, certification) {
        if (certification) {
          res.status(200).json(certification || {})
        }
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

module.exports = Show
