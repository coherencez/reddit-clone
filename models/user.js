'use strict'

const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		index: {unique: true}
	},
	password: {
		type: String,
		required: true
	}
})

// class static methods
userSchema.statics.findOneByUser = function(user,cb) {
	const collection = this
	return collection.findOne({user}, cb)
}

module.exports = mogoose.model('User', userSchema)