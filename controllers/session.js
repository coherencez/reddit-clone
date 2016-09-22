'use strict'
// const User = require('../models/user')
const passport = require('passport')

module.exports.new = (req,res) => {
	res.render('login', {})
}

module.exports.create = (req,res,next) => {
	passport.authenticate('local', (err, user, msg) => {
		if (err) { return next(err) }
		if(!user) { return res.render('login', msg)}

		req.logIn(user, err => {
			if(err) {return next(err)}
			res.redirect('/')
		})
	})(req,res,next)
}
// module.exports.create = ({session,body: {user, password}},res,err) => {
// 	User.findOneByUser(user)
// 		.then(dbUser => {
// 			if(dbUser) {
// 				return dbUser.comparePassword(password)
// 			} 
// 			else {
// 				res.render('/login', {msg: 'User not found'})
// 			}
// 		})
// 		.then(matches => {
// 			if(matches) {
// 				session.user = user
// 				res.redirect('/')
// 			} else {
// 				res.render('/login', {msg: 'Password incorrect, please try again'})
// 			}
// 		})
// 		.catch(err)
// }
module.exports.edit = (req,res) => {
	res.render('logout', {})
}
module.exports.destroy = (req,res) => {
	req.logout()
	res.redirect('/login')
}