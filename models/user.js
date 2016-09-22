'use strict'

const mongoose = require('mongoose')


module.exports = mongoose.model('User', {
	user: String,
	password: String,
})