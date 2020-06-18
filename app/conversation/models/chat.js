const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const User = require('../../models/user')
// const UserModel = mongoose.Model(User)

const ChatSchema = new Schema({
  message: {
    type: String
  },
  sender: {
    type: String // , TODO: ObjectId
    // ref: 'User'
  },
  type: {
    type: String
  }
}, {
  timestamps: true
}, {
  collection: 'chats',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

ChatSchema.methods.getSender = () => {
  // TODO: relations
  // return UserModel.findById({this.sender}, (err,doc) => {
  //   if (err) console.log(err)
  //
  //   return {first_name: doc.first_name, last_name: doc.last_name}
  // })
  return 'me'
}

module.exports = ChatSchema
