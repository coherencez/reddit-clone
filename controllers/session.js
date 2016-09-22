'use strict'
const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports.new = (req,res) => {
	res.render('login', {})
}
module.exports.create = ({session,body: {user, password}},res,err) => {
	User.findOne({user})
		.then(dbUser => {
			if(dbUser) {
				return new Promise((resolve, reject) => {
					bcrypt.compare(password, dbUser.password, (err, matches) => {
						if (err) { reject(err) }
						else { resolve(matches) }
					})
				})
			} else {
				res.render('/login', {msg: 'User not found'})
			}
		})
		.then(matches => {
			if(matches) {
				session.user = user
				res.redirect('/')
			} else {
				res.render('/login', {msg: 'Password incorrect, please try again'})
			}
		})
		.catch(err)
}
module.exports.edit = (req,res) => {
	res.render('logout', {})
}
module.exports.destroy = (req,res) => {
	req.session.destroy((err) => {
		if(err) throw err 
		res.redirect('/login')
	})
}