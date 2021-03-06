const JobOffer = require('../../models/job-offer')
// const auth = require('../../auth.js')
// const auth = new auth()
/**
 * Show
 * @class
 */
class Show {
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
    this.app.get(`${this.apiPrefix}/job-offer/show/:slug`, async (req, res) => {
      const { slug } = req.params
      // res.status(200).json(req.params)
      let query = this.JobOfferModel.where({
        slug: slug
        // company_name: companyName
      })
      query.findOne(function (_, jobOffer) {
        if (jobOffer) {
          res.status(200).json(jobOffer || {})
        }
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

module.exports = Show
