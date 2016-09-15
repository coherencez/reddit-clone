'use strict'
// third part modules
const express = require('express')
  ,       app = express()
  ,    routes = require('./routes/')

// project variables
  ,      port = process.env.PORT || 3000

app.set('port', port)
app.set('view engine', 'pug')
app.use(express.static('public'))

app.use(routes)



app.listen(port, () => {
	console.log(`Now liestening on port ${port}`);
})
