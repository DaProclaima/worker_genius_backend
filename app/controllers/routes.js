// Users
const NewUser = require('./user/new')
const ShowUser = require('./user/show')
const EditUser = require('./user/edit')
const DeleteUser = require('./user/delete')
const ListUser = require('./user/list')

// Certifications
const NewCertification = require('./certification/new')
const ShowCertification = require('./certification/show')
const EditCertification = require('./certification/edit')
const DeleteCertification = require('./certification/delete')
const ListCertification = require('./certification/list')

// jobOffers
const NewJobOffer = require('./job-offer/new')
// const ShowJobOffer = require('./job-offer/show')
// const EditJobOffer = require('./job-offer/edit')
// const DeleteJobOffer = require('./job-offer/delete')
// const ListJobOffer = require('./job-offer/list')

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
  },
  jobOffers: {
    NewJobOffer

  }
}
