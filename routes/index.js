'use strict'

const {Router} = require('express')
  ,     router = Router()
  ,       home = require('../controllers/home')
  ,    newPost = require('../controllers/new')
  ,    comments = require('../controllers/comments')
  ,    Article = require('../models/article')

router.get('/', home.new)

router.post('/', home.edit)

router.get('/new', newPost.new)

router.post('/new', newPost.create)

router.get('/comments/:id', comments.new)

router.post('/comments/:id', comments.create)

module.exports = router
