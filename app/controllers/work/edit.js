const Work = require('../../models/work')
const { validationEdit } = require('../../validations/work')
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
    this.app.put(`${this.apiPrefix}/work/edit/:id`, async (req, res) => {
      const updateObj = {}
      const { id } = req.params 
      const { body } = req
      const { error } = validationEdit(body)
      try {
        if (error) { 
          console.log(error)
          return res.status(403).send(error.details[0].message)
        }
      } catch (error) {
        console.log(error)
      }

      if (body.corrector_id) updateObj.corrector_id = body.corrector_id
      if (body.grade) updateObj.grade = body.grade
      if (body.correction_date) updateObj.correction_date = body.correction_date

      this.WorkModel.findByIdAndUpdate(id, {   
        corrector_id: updateObj.corrector_id,
        grade: updateObj.grade,
        correction_date: updateObj.correction_date,
        update_date: Date.Now
    
      }, {
        new: true,
        omitUndefined: true
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
