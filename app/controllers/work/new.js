const Work = require('../../models/work')
const { validationNew } = require('../../validations/work')
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
        const { error } = validationNew(req.body)
        if (error) { 
          console.log(error)
          return res.status(403).send(error.details[0].message)
        }
        const workModel = new this.WorkModel(req.body)
        const slug = `${workModel.getCandidateId()}-${workModel.getCertificationId()}`
        workModel.setSlug(slug)
        await res.status(201).send({workModel})
        workModel.save()
      } catch (error) {
        console.log(error)
        res.status(500).json({
          'code': 500,
          'message': error
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
