const Work = require('../../models/work')

/**
 * Show
 * @class
 */
class Show {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.Model = connect.model('Work', Work)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get(`${this.apiPrefix}/work/show/:id`, async (req, res) => {
      try {
        const { id } = req.params
        // await res.status(201).send({ body })
        this.Model.findById(id).then(msg => {
          res.status(200).json(msg || {})
        })
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

module.exports = Show
