const User = require('../../models/user')
// const auth = require('../../verifyToken.js')
// const auth = new auth()

/**
 * Create
 * @class
 */
class Show {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.UserModel = connect.model('User', User)
    // console.log(this)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get(`${this.apiPrefix}/user/show/:id`, async (req, res) => {
      try {
        const { id } = req.params
        var query = {$or: [{slug: id}]}
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          query.$or.push({_id: id})
        }

        await this.UserModel.find(query).then(model => {
          res.status(200).json(model || {})
          // console.log(model)
        })
          .catch(err => {
            res.status(500).json({
              code: 500,
              error: err
            })
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
