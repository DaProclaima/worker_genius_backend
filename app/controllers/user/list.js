const User = require('../../models/user')
// const auth = require('../../auth.js')
// const auth = new auth()

/**
 * Create
 * @class
 */
class List {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.UserModel = connect.model('User', User)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get(`${this.apiPrefix}/user/list`, (_, res) => {
      try {
        this.UserModel.find({}, function (err, result) {
          if (err) {
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
