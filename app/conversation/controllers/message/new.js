const Message = require('../../models/message')

/**
 * New
 * @class
 */
class New {
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
    this.app.post(`${this.apiPrefix}/message/new`, async (req, res) => {
      try {
        const { body } = req
        // await res.status(201).send({ body })
        const msgModel = new this.MsgModel(body)
        await res.status(201).send({ msgModel })
        msgModel.save()
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
