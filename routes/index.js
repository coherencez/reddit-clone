'use strict'

const {Router} = require('express')
  ,    router = Router()
  ,   Article = require('../models/article')

router.get('/', (req,res, cb) => {
	Article
		.find()
		.sort({rating: -1})
		.then(data => {
			res.render('home', {home: true, data})
		})
		.catch(cb)
})

router.post('/', (req,res,cb) => {
	let id = req.body.upvote || req.body.downvote
	  , currentRating
	  , rating
	Article
		.find({_id: id}, {rating: 1})
		.then(data => {
			currentRating = data[0].rating
			;(Object.keys(req.body)[0] === 'upvote')
				? rating = currentRating + 1
				: rating = currentRating - 1
		})
		.then(() => {
			Article
				.update({_id: id}, {$set: {rating: rating}})
				.then(() => res.redirect('/'))
		})
})

router.get('/new', (req,res) => {
		res.render('newArticle')
})

router.post('/new', (req,res,cb) => {
		console.log("REQ", req.body);
		Article
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch(cb)
})

module.exports = router
