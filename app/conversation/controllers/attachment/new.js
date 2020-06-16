const Attachment = require('../../models/attachment')
/**
 * New
 * @class
 */
class New {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.AttachmentModel = connect.model('Attachment', Attachment)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.post(`${this.apiPrefix}/attachment/new`, async (req, res) => {
      try {
        const { body } = req
        // await res.status(201).send({ body })
        const attachmentModel = new this.AttachmentModel(body)
        await res.status(201).send({ attachmentModel })
        attachmentModel.save()
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
