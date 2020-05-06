const Email = require('../../models/email')

/**
 * New
 * @class
 */
class New {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.EmailModel = connect.model('Email', Email)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.post(`${this.apiPrefix}/email/new`, async (req, res) => {
      const emailModel = new this.EmailModel(req.body)
      try {
        if(emailModel) {
          await res.status(201).send({ emailModel })
          emailModel.save()
          return
        }
        throw new Error('Error from server while processing new email creation.')
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
