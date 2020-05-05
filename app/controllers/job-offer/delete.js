const JobOffer = require('../../models/job-offer')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()
/**
 * Delete
 * @class
 */
class Delete {
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
    this.app.delete(`${this.apiPrefix}/job-offer/delete/:slug`, (req, res) => {
      try {
        const { slug } = req.params
        this.JobOfferModel.findOneAndDelete({slug: slug})
          .then(model => {
            res.status(200).json(model || {})
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
