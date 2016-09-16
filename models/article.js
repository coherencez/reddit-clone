'use strict'

const mongoose = require('mongoose')


module.exports = mongoose.model('Article', {
	title: String,
	image: String,
	url: String,
	tags: [String],
	rating: {type: Number, default: 0},
	comments: Array,
})