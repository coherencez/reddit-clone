'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const BCRYPT_DIFFICULTY = 15

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

// lifecycle methods
userSchema.pre('save', function(cb) {
	const user = this
	bcrypt.hash(user.password, BCRYPT_DIFFICULTY, (err, hashedPassword) => {
		if(err) {return cb(err)}
			user.password = hashedPassword
			cb()
	})
})

// class static methods
userSchema.statics.findOneByUser = function(user,cb) {
	const collection = this
	return collection.findOne({user}, cb)
}

// instance methods
userSchema.methods.comparePassword = function(password, cb) {
	const user = this
	// support for cb pattern and `Promises`
	if(typeof cb === 'function') {
		return bcrypt.compare(password, user.password, cb)
	}

	return new Promise((resolve, reject) => {
		bcrypt.compare(password, user.password, (err, matches) => {
			err ? reject(err) : resolve(matches)
		})
	})
}



module.exports = mongoose.model('User', userSchema)