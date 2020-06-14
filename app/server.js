const express = require('express')
const routes = require('./controllers/routes.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
// const path = require('path')
// const fetch = require('node-fetch')

/**
 * Server
 * @Class
 */
class Server {
  constructor () {
    this.app = express()
    this.port = process.env.API_SERVER_PORT
    this.apiPrefix = '/api/v1'
  }

  // fecthArticle () {
  //   const article = fetch('http://localhost:3000/article/list/')
  //     .then(response => response.json())
  //     .then(data => {
  //       return data
  //     })
  //   return article
  // }

  // showArtice (id) {
  //   const article = fetch(`http://localhost:3000/article/show/${id}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       return data
  //     })
  //   return article
  // }

  /**
   * db connect
   * @return {Object} connect
   */
  dbConnect () {
    const host = process.env.DB_CONNECT || process.env.DB_CONNECT_LOCAL
    const connect = mongoose.createConnection(host, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  
    connect.on('error', (err) => {
      setTimeout(() => {
        console.log('[ERROR] api dbConnect() -> mongodb error')
        this.connect = this.dbConnect(host)
      }, 5000)
  
      console.error(`[ERROR] api dbConnect() -> ${err}`)
    })
  
    connect.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host)
      }, 5000)
    })
  
    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection ')
        process.exit(0)
      })
    })
    return connect
  }

  /**
   * middleware
   */
  middleware () {
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
    this.app.use(bodyParser.json())
  }

  /**
   * routes
   */
  routes () {
    // Users
    // new routes.users.NewUser(this.app, this.connect, this.apiPrefix)
    new routes.users.ShowUser(this.app, this.connect, this.apiPrefix)
    new routes.users.EditUser(this.app, this.connect, this.apiPrefix)
    new routes.users.EditUserPassword(this.app, this.connect, this.apiPrefix)
    new routes.users.DeleteUser(this.app, this.connect, this.apiPrefix)
    new routes.users.ListUser(this.app, this.connect, this.apiPrefix)

    // certifications
    new routes.certifications.NewCertification(this.app, this.connect, this.apiPrefix)
    new routes.certifications.ShowCertification(this.app, this.connect, this.apiPrefix)
    new routes.certifications.EditCertification(this.app, this.connect, this.apiPrefix)
    new routes.certifications.DeleteCertification(this.app, this.connect, this.apiPrefix)
    new routes.certifications.ListCertification(this.app, this.connect, this.apiPrefix)

    // jobOffers
    new routes.jobOffers.NewJobOffer(this.app, this.connect, this.apiPrefix)
    new routes.jobOffers.ShowJobOffer(this.app, this.connect, this.apiPrefix)
    new routes.jobOffers.EditJobOffer(this.app, this.connect, this.apiPrefix)
    new routes.jobOffers.DeleteJobOffer(this.app, this.connect, this.apiPrefix)
    new routes.jobOffers.ListJobOffer(this.app, this.connect, this.apiPrefix)

    // emails
    new routes.emails.NewEmail(this.app, this.connect, this.apiPrefix)

    // messages
    new routes.messages.NewMessage(this.app, this.connect, this.apiPrefix)
    new routes.messages.ShowMessage(this.app, this.connect, this.apiPrefix)
    new routes.messages.EditMessage(this.app, this.connect, this.apiPrefix)
    new routes.messages.DeleteMessage(this.app, this.connect, this.apiPrefix)
    new routes.messages.ListMessage(this.app, this.connect, this.apiPrefix)

    // bills
    new routes.bills.NewBill(this.app, this.connect, this.apiPrefix)
    new routes.bills.ShowBill(this.app, this.connect, this.apiPrefix)
    new routes.bills.EditBill(this.app, this.connect, this.apiPrefix)
    new routes.bills.DeleteBill(this.app, this.connect, this.apiPrefix)
    new routes.bills.ListBill(this.app, this.connect, this.apiPrefix)

    // works
    new routes.works.NewWork(this.app, this.connect, this.apiPrefix)
    new routes.works.ShowWork(this.app, this.connect, this.apiPrefix)
    new routes.works.EditWork(this.app, this.connect, this.apiPrefix)
    new routes.works.ListWork(this.app, this.connect, this.apiPrefix)
    new routes.works.DeleteWork(this.app, this.connect, this.apiPrefix)
    
    this.app.use((_, res) => {
      res.status(404).json({
        'code': 404,
        'message': 'Route not Found'
      })
    })
  }

  /**
   * run
   */
  run () {
    try {
      this.connect = this.dbConnect()
      this.dbConnect()
      this.middleware()
      this.routes()
      this.app.listen(this.port, () => console.log(`Server is listening on port ${this.port} and dirname is ${__dirname}`))
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`)
    }
  }
}

module.exports = Server
