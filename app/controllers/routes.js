// Users
// const CreateUser = require('./users/create')
// const ShowUser = require('./users/show')
// const DeleteUser = require('./users/delete')
// const UpdateUser = require('./users/update')
// const ListUser = require('./users/list')

// Certifications
const NewCertification = require('./certifications/new')
const ShowCertification = require('./certifications/show')
const ListCertification = require('./certifications/list')
const EditCertification = require('./certifications/edit')
const DeleteCertification = require('./certifications/delete')

module.exports = {
  // users: {
  //   CreateUser,
  //   ShowUser, 
  //   DeleteUser,
  //   UpdateUser
  // },
  certifications: {
    NewCertification,
    ShowCertification,
    EditCertification,
    DeleteCertification,
    ListCertification
  }
}
