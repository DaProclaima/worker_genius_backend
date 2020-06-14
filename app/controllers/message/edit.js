const Message = require('../../models/message')

/**
 * Edit
 * @class
 */
class Edit {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.MsgModel = connect.model('Message', Message)
    this.apiPrefix = apiPrefix
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put(`${this.apiPrefix}/message/edit/:id`, async (req, res) => {
      const { id } = req.params 
      const { body } = req
      // TODO update field
      this.MsgModel.findByIdAndUpdate(id, {
        $set: {
          content: body.content
        }
      }, {
        new: true
      }).then(model => {
        model.setLastUpdate()
        res.status(200).json(model || {})
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

module.exports = Edit
