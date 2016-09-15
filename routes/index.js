'use strict'

const {Router} = require('express')
  ,    router = Router()


router.get('/', (req,res) => {
	res.render('home', {home: true})
})

router.get('/new', (req,res) => {
	res.render('newArticle')
})

module.exports = router
