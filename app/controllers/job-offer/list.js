const JobOffer = require('../../models/job-offer')
// const auth = require('../../verifyToken.js')
// const auth = new auth()

/**
 * List
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
    this.app.get(`${this.apiPrefix}/job-offer/list`, (req, res) => {
      // console.log(req)
      try {
        this.JobOfferModel.find({}, function (err, result) {
          if (err) {
            console.error(err)

            res.status(500).json({
              'code': 500,
              'message': err
            })
          } else {
            console.log(result)
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
