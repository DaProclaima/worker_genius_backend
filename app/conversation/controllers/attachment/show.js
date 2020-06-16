const Attachment = require('../../models/attachment')
/**
 * Show
 * @class
 */
class Show {
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
    this.app.get(`${this.apiPrefix}/attachment/show/:id`, async (req, res) => {
      try {
        const { id } = req.params

        await this.AttachmentModel.findById(id).then(attachment => {
          res.status(200).json(attachment || {})
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
