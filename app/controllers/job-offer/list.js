const JobOffer = require('../../models/job-offer')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()

/**
 * Create
 * @class
 */
class List {
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
    this.app.get(`${this.apiPrefix}/job-offer/list`, (_, res) => {
      try {
        this.JobOfferModel.find({}, function (err, result) {
          if (err) {
            console.error(err)
            
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
