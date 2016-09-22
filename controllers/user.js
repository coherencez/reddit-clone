'use strict'
const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports.new = (req,res) => {
	res.render('register', {})
}

module.exports.create = ({body: {user,password,confirmation}},res,err) => {
	console.log("DATA", typeof user)
	if(password === confirmation) {
		User.findOne({user})
		 .then(dbUser => {
		 	if(dbUser) {
		 		return res.render('register', {msg: 'Username already registered'})
		 	}
		 	return new Promise((resolve, reject) => {
			 	bcrypt.hash(password, 15, (err, hashPass) => {
			 		if(err) {reject(err)}
			 		else {resolve(hashPass)}
			 	})
		 	})
		 	// return User.create({user,password})
		 })
		 .then(hash => { User.create({user,password: hash}) })
		 .then(() => res.redirect('/login'))
		 .catch(err)
	} else {
		res.render('register', {msg: 'Password & confirmation do not match.'})
	}
}