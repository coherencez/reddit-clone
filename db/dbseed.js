const {connect, disconnect} = require('./database')
const Article = require('../models/article')
const articles = require('./articles')

connect()
  .then(() => Article.remove({}))
  .then(() => Article.insertMany(articles))
  .then(disconnect)
  .catch(console.error)