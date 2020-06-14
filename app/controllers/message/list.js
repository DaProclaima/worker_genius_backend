const Message = require('../../models/message')
// const auth = require('../../auth.js')
// const auth = new auth()

/**
 * List
 * @class
 */
class List {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.MessageModel = connect.model('Message', Message)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get(`${this.apiPrefix}/message/list`, (_, res) => {
      try {
        this.MessageModel.find({}, function (err, result) {
          if (err) {
            console.error(err)
            
            res.status(500).json({
              'code': 500,
              'message': err
            })
          } else {
            res.status(200).json(result)
          }
        })
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

module.exports = List
