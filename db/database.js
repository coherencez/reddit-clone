'use strict'
const mongoose = require('mongoose')
const pw = require('./yodawg')

const MONGODB_URL = `mongodb://tkswann2:${pw}@ds033076.mlab.com:33076/reddit-clone`
// const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/redditclone'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()