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
const ShowJobOffer = require('./job-offer/show')
const EditJobOffer = require('./job-offer/edit')
const DeleteJobOffer = require('./job-offer/delete')
const ListJobOffer = require('./job-offer/list')

// Emails
const NewEmail = require('./email/new')

// Messages
const NewMessage = require('./message/new')
const ShowMessage = require('./message/show')
const EditMessage = require('./message/edit')
const ListMessage = require('./message/list')
const DeleteMessage = require('./message/delete')

// Bills
const NewBill = require('./bill/new')
const ShowBill = require('./bill/show')
const EditBill = require('./bill/edit')
const DeleteBill = require('./bill/delete')
const ListBill = require('./bill/list')

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
    NewJobOffer,
    ShowJobOffer,
    EditJobOffer,
    DeleteJobOffer,
    ListJobOffer
  },
  emails: {
    NewEmail
  },
  messages: {
    NewMessage,
    ShowMessage,
    EditMessage,
    DeleteMessage,
    ListMessage
  },
  bills: {
    NewBill,
    ShowBill,
    EditBill,
    DeleteBill,
    ListBill
  }
}
