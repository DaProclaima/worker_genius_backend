const Work = require('../../models/work')
// const User = require('../../models/user')
// const fetch = require('node-fetch')
// TODO: every controller has to check consistency of given command for security check ( no node commands)

/**
 * Create
 * @class
 */
class New {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.WorkModel = connect.model('Work', Work)
    // this.UserModel = connect.model('User', User)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.post(`${this.apiPrefix}/work/new`, async (req, res) => {
      try {
        const workModel = new this.WorkModel(req.body)
        await res.status(201).send({workModel})
        workModel.save()
      } catch (err) {
        console.log(err)
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

module.exports = New
