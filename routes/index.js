'use strict'

const {Router} = require('express')
  ,     router = Router()
  ,       home = require('../controllers/home')
  ,    newPost = require('../controllers/new')
  ,    comments = require('../controllers/comments')
  ,    session = require('../controllers/session')
  ,    user = require('../controllers/user')

router.get('/', home.new)

router.get('/comments/:id', comments.new)

router.get('/register', user.new)
router.post('/register', user.create)

router.get('/login', session.new)
router.post('/login', session.create)

// guardRoutes middleware
router.use((req,res,next) => {
  if(req.user) {
    next()
  } else if (req.url !== '/') {
    res.redirect(req.url)
  } else {
    res.redirect('/')
  }
})

router.post('/', home.edit)

router.get('/new', newPost.new)

router.post('/new', newPost.create)

router.post('/comments/:id', comments.create)

module.exports = router
