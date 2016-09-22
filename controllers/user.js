'use strict'
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

		 	return User.create({user,password})
		 })
		 .then(() => res.redirect('/login'))
		 .catch(err)
	} else {
		res.render('register', {msg: 'Password & confirmation do not match.'})
	}
}