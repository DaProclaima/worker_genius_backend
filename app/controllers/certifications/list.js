const Certification = require('../../models/certification')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()
/**
 * Create
 * @class
 */
class List {
  constructor (app, connect) {
    this.app = app
    this.CertificationModel = connect.model('Certification', Certification)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get('/api/v1/certification/list', (req, res) => {
      try {
        this.CertificationModel.find({}, function (err, result) {
          if (err) {
            res.status(500).json({
              'code': 500,
              'message': err
            })
          } else {
            res.status(200).json(result)
          }
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

module.exports = List
