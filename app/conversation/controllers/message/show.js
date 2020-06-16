const Message = require('../../models/message')

/**
 * Show
 * @class
 */
class Show {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.MsgModel = connect.model('Message', Message)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get(`${this.apiPrefix}/message/show/:id`, async (req, res) => {
      try {
        const { id } = req.params

        await this.MsgModel.findById(id).then(msg => {
          res.status(200).json(msg || {})
        })
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
