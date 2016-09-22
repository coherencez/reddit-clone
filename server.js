'use strict'
// third part modules
const express = require('express')
	,{
		cyan, 
		red
	 } = require('chalk')
	, bodyParser = require('body-parser')
	,    session = require('express-session')
	, RedisStore = require('connect-redis')(session)
	,   passport = require('passport')

// project variables
  ,    routes = require('./routes/')
  , {connect} = require('./db/database')
  ,      port = process.env.PORT || 3000
  ,       app = express()

// express setup
app.set('port', port)
app.set('view engine', 'pug')
app.use(session({
	url: process.env.REDIS_URL || 'redis://localhost:6379',
	store: new RedisStore(),
	secret: process.env.SESSION_SECRET || 'reddit-clone'
}))

require('./lib/passport-strategies')
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next) => {
	app.locals.user = req.user && req.user.user
	next()
})

// middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
    const timeStamp = new Date()
  console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})

// routing 
app.use(routes)


// database and server connection
connect()
	.then(() => {
		app.listen(port, () => {
			console.log(`Now listening on port ${port}`);
		})
	})
	.catch(console.error)
