const Bill = require('../../models/bill')
// const auth = require('../../auth.js')
// const auth = new auth()
/**
 * Create
 * @class
 */
class Delete {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.BillModel = connect.model('Bill', Bill)
    this.run()
  }
  /**
   * middleware
   */
  middleware () {
    this.app.delete(`${this.apiPrefix}/bill/delete/:id`, async (req, res) => {
      try {
        const { id } = req.params
        this.BillModel.findByIdAndDelete(id)
          .then(model => {
            res.status(200).json(model || {})
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
