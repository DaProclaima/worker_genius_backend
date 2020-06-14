const JobOffer = require('../../models/job-offer')
// const User = require('../../models/user')
const { validationNew } = require('../../validations/job-offer')
/**
 * New
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
        const { error } = validationNew(req.body)
        if (error) { 
          console.log(error)
          return res.status(403).send(error.details[0].message)
        }
      } catch (error) {
        console.log(error)
      }
      try {
        const jobOfferModel = new this.JobOfferModel(req.body)
        jobOfferModel.setSlug(jobOfferModel._id)
        await res.status(201).send({ jobOfferModel })
        jobOfferModel.save()
        // throw new Error('Error from server while processing new job offer creation.')
      } catch (err) {
        console.error(err) // For debugging reasons

        return res.status(500).send({
          error: 'GENERIC',
          description: 'Something went wrong. Please try again or contact support.'
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
