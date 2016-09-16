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
	  , voteIncrementer

	;(Object.keys(req.body)[0] === 'upvote') ? voteIncrementer = 1 : voteIncrementer = -1

		Article
			.update({_id: id}, {$inc: {rating: voteIncrementer}})
			.then(() => res.redirect('/'))
			.catch(cb)
})

router.get('/new', (req,res) => {
		res.render('newArticle')
})

router.post('/new', (req,res,cb) => {
		Article
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch(cb)
})


router.get('/comments/:id', ({params: {id}},res) => {
	Article
		.find({_id: id})
		.then(data => {
			let [article, ...rest] = data
			res.render('comments', {article})
		})
})

router.post('/comments/:id', ({body: {comments}, params: {id}},res) => {
	let newObj = {
		text: comments,
		vote: 0,
		id: Date()
	}
	Article
		.update({_id: id}, {$push: { comments: newObj } })
		.then(() => res.redirect(`/comments/${id}`))
})

module.exports = router
