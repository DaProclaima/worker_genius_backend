const User = require('../../models/user')
// const auth = require('../../auth.js')
// const auth = new auth()

/**
 * Delete
 * @class
 */
class Delete {
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
    this.app.delete(`${this.apiPrefix}/user/delete/:id`, async (req, res) => {
      try {
        const { id } = req.params
        var query = {$or: [{slug: id}]}
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          query.$or.push({_id: id})
        }

        this.UserModel.findOneAndDelete(query)
          .then(model => {
            res.status(200).json(model || {})
          })
          .catch(err => {
            res.send({
              code: 500,
              error: err
            })
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

module.exports = Delete
