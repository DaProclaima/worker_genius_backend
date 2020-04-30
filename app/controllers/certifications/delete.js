const Certification = require('../../models/certification')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()
/**
 * Create
 * @class
 */
class Delete {
  constructor (app, connect) {
    this.app = app
    this.CertificationModel = connect.model('Certification', Certification)
    this.run()
  }
  /**
   * middleware
   */
  middleware () {
    this.app.delete('/api/v1/certification/delete/:slug', (req, res) => {
      try {
        const { slug } = req.params
        this.CertificationModel.findOneAndDelete({slug: slug})
          .then(certification => {
            res.status(200).json(certification || {})
          })
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

module.exports = Delete
