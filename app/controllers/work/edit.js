const Work = require('../../models/work')

/**
 * Edit
 * @class
 */
class Edit {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.WorkModel = connect.model('Work', Work)
    this.apiPrefix = apiPrefix
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put(`${this.apiPrefix}/work/edit/:id`, (req, res) => {
      const { id } = req.params 
      const { body } = req

      this.WorkModel.findByIdAndUpdate(id, {
        $set: {
          slug: body.slug,
          project: body.project,
          candidate_id: body.candidate_id,
          corrector_id: body.corrector_id,
          watcher_id: body.watcher_id,
          certification_id: body.certification_id, 
          grade: body.grade,
          correction_date: body.correction_date,
          update_date: Date.Now
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
