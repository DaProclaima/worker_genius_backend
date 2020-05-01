// Users
const NewUser = require('./users/new')
const ShowUser = require('./users/show')
const EditUser = require('./users/edit')
const DeleteUser = require('./users/delete')
const ListUser = require('./users/list')

// Certifications
const NewCertification = require('./certifications/new')
const ShowCertification = require('./certifications/show')
const EditCertification = require('./certifications/edit')
const DeleteCertification = require('./certifications/delete')
const ListCertification = require('./certifications/list')

module.exports = {
  users: {
    NewUser,
    ShowUser,
    EditUser,
    DeleteUser,
    ListUser
  },
  certifications: {
    NewCertification,
    ShowCertification,
    EditCertification,
    DeleteCertification,
    ListCertification
  }
}
