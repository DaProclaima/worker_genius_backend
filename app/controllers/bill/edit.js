const Bill = require('../../models/bill')

/**
 * Edit
 * @class
 */
class Edit {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.BillModel = connect.model('Bill', Bill)
    this.apiPrefix = apiPrefix
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put(`${this.apiPrefix}/bill/edit/:id`, (req, res) => {
      const { id } = req.params 
      const { body } = req

      this.BillModel.findByIdAndUpdate(id, {
        $set: {
          amount: body.amount,
          payment_option: body.payment_option,
          money_currency: body.money_currency,
          list_privileges: body.list_privileges,
          last_update: Date.now()
        }
      }, {
        new: true
      }).then(model => {
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
