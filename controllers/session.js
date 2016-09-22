'use strict'
const User = require('../models/user')

module.exports.new = (req,res) => {
	res.render('login', {})
}
module.exports.create = ({session,body: {user, password}},res) => {
	console.log("HELLO", session);
	// User.findOne({user})
	// 	.then(dbUser => {
	// 		if(dbUser) {

	// 		} else {
	// 			res.rend....
	// 		}
	// 	})
}
module.exports.edit = () => {}
module.exports.destroy = () => {}