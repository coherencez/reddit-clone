'use strict'
// third part modules
const express = require('express')
  ,       app = express()

// project variables
  ,      port = process.env.PORT || 3000

app.set('port', port)
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req,res) => {
	res.render('home', {home: true})
})

app.get('/new', (req,res) => {
	res.render('newArticle')
})


app.listen(port, () => {
	console.log(`Now liestening on port ${port}`);
})
