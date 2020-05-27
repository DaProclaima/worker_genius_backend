const Bill = require('../../models/bill')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()

/**
 * Create
 * @class
 */
class Delete {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.MsgModel = connect.model('Bill', Bill)
    this.run()
  }
  /**
   * middleware
   */
  middleware () {
    this.app.delete(`${this.apiPrefix}/bill/delete/:id`, async (req, res) => {
      try {
        const { id } = req.params
        this.MsgModel.findByIdAndDelete(id)
          .then(model => {
            res.status(200).json(model || {})
          })
      } catch (err) {
        console.log(err)
        res.status(500).json({
          'code': 500,
          'bill': err
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
