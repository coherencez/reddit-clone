'use strict'

const mongoose = require('mongoose')


module.exports = mongoose.model('Article', {
	title: String,
	image: String,
	url: String,
	comments: String,
	rating: {type: Number, default: 0}
})