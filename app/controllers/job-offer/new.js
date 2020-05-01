const JobOffer = require('../../models/job-offer')
// const User = require('../../models/user')

/**
 * Create
 * @class
 */
class New {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.JobOfferModel = connect.model('JobOffer', JobOffer)
    // this.UserModel = connect.model('User', User)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.post(`${this.apiPrefix}/job-offer/new`, async (req, res) => {
      try {
        const jobOfferModel = new this.JobOfferModel(req.body)
        jobOfferModel.setSlug()
        await res.status(201).send({jobOfferModel})
        jobOfferModel.save()
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
