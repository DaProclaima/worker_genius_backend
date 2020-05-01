// Users
const NewUser = require('./users/new')
const ShowUser = require('./users/show')
// const DeleteUser = require('./users/delete')
const EditUser = require('./users/edit')
// const ListUser = require('./users/list')

// Certifications
const NewCertification = require('./certifications/new')
const ShowCertification = require('./certifications/show')
const ListCertification = require('./certifications/list')
const EditCertification = require('./certifications/edit')
const DeleteCertification = require('./certifications/delete')

module.exports = {
  users: {
    NewUser,
    ShowUser,
    //   DeleteUser,
    EditUser
  },
  certifications: {
    NewCertification,
    ShowCertification,
    EditCertification,
    DeleteCertification,
    ListCertification
  }
}
