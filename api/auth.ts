import {Request, Response} from "express";
import {collection} from "../app/mock/user.mock";
import {LoginRequest} from "../app/auth/login.request";
import {UserModel} from "~/app/model/user.model";

const bodyParser = require('body-parser')
const logger = require('morgan')
const app = require('express')()

app.use(bodyParser.json())
app.use(logger("[:date[iso]] :method :url :status :response-time ms - :res[content-length]"))

// idk, i don't like this here....
declare module 'express-session' {
  interface SessionData {
    user: UserModel
  }
}

app.post('/login', (req: Request, res: Response) => {
  console.log('api', req.session.user)
  if (req.session.user) {
    res.status(400)
      .json({
        status: false,
        message: 'auth.already_logged_in',
        error: {}
      })
  }

  const loginRequest: LoginRequest = req.body
  const userIndex = collection.findIndex(user => user.email === loginRequest.email)

  if (-1 === userIndex) {
    res.json({
      success: false,
      message: 'auth.user_not_found',
      error: {}
    })
  }

  const user = collection[userIndex]
  req.session.user = user

  res.json({
    status: true,
    message: 'auth.login_success',
    data: user
  })
})

app.post('/logout', (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(400)
      .json({
        status: false,
        message: 'auth.already_logged_out'
      })
  }

  req.session.destroy(() => {})

  res.json({
    status: true,
    message: 'auth.logout_success'
  })
})

module.exports = app
