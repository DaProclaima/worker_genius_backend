const bcrypt = require('bcryptjs')
const User = require('../../../models/user')
// const JWT = require('../../jwt.js')
// const jwt = new JWT()
const { updatePassword } = require('../../../validations/user')

/**
 * Create
 * @class
 */
class Edit {
  constructor (app, connect, apiPrefix) {
    this.app = app
    this.apiPrefix = apiPrefix
    this.UserModel = connect.model('User', User)
    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.put(`${this.apiPrefix}/user-password/edit/:id`, async (req, res) => {
      const { id } = req.params
      const { body } = req
      const updateObj = {}
      var query = {$or: [{slug: id}]}
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or.push({_id: id})
      }

      try {
        const { error } = updatePassword({hash: body.hash, verifyHash: body.verifyHash})
        if (error) { 
          console.log(error)
          return res.status(403).send(error.details[0].message)
        }
      } catch (error) {
        console.log(error)
      }
      if (body.hash) {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(body.hash, salt)
        updateObj.hash = hashed
      }
      
      this.UserModel.findOneAndUpdate(query, {
        hash: updateObj.hash,
        last_update: Date.now()
      }, {
        new: true,
        omitUndefined: true
      }).then(model => {  
        model = {_id: model.id, last_update: model.last_update}
        res.status(200).json(model || {})
      }).catch(err => {
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
