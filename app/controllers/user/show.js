const User = require('../../models/user')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()

/**
 * Create
 * @class
 */
class Show {
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
    this.app.get(`${this.apiPrefix}/user/show/:slug`, (req, res) => {
      const { slug } = req.params
      let query = this.UserModel.where({slug: slug})
      query.findOne(function (_, model) {
        if (model) {
          res.status(200).json(model || {})
        }
      }).catch(err => {
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

module.exports = Show
