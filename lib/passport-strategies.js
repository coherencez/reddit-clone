'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')

const User = require('../models/user')

passport.serializeUser((user, cb) => cb(null, user.id))
passport.deserializeUser((_id, cb) => User.findOne({ _id }, cb))

const localStrategy = new Strategy(
  {
    usernameField: 'user',
    passwordField: 'password',
  },
  (user, password, cb) =>
    User.findOneByUser(user)
      .then(dbUser => {
        if (dbUser) {
          return Promise.all([
            dbUser,
            dbUser.comparePassword(password),
          ])
        }

        cb(null, null, { msg: 'User does not exist in our system' })
      })
      .then(([dbUser, matches]) => {
        if (matches) {
          cb(null, dbUser, { msg: 'Successfully logged in' })
        } else {
          cb(null, null, { msg: 'Password does not match' })
        }
      })
      .catch(cb)
)

passport.use(localStrategy)