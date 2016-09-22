'use strict'
const User = require('../models/user')

module.exports.new = (req,res) => {
	res.render('login', {})
}
module.exports.create = ({session,body: {user, password}},res) => {
	User.findOne({user})
		.then(dbUser => {
			if(dbUser) {
				if(dbUser.password === password) {
					session.user = dbUser
					res.redirect('/')
				} else {
					res.render('/login', {msg: 'Password not correct'})
				}
			} else {
				res.render('/login', {msg: 'User not found'})
			}
		})
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