const Bill = require('../../models/bill')

/**
 * New
 * @class
 */
class New {
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
    this.app.post(`${this.apiPrefix}/bill/new`, async (req, res) => {
      try {
        const { body } = req
        // await res.status(201).send({ body })
        const billModel = new this.BillModel(body)
        await res.status(201).send({ billModel })
        billModel.save()
        // throw new Error('Error from server while processing new job offer creation.')
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

module.exports = New
