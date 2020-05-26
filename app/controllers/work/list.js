const Work = require('../../models/work')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()

/**
 * List
 * @class
 */
class List {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.Model = connect.model('Work', Work)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get(`${this.apiPrefix}/work/list`, (_, res) => {
      try {
        this.Model.find({}, function (err, result) {
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
